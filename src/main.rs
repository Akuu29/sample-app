use actix_web::{App, HttpServer, get, Responder};
use dotenv::dotenv;
use listenfd::ListenFd;
use std::env;

#[get("/hello")]
async fn hello_world() -> impl Responder {
    format!("Hello World!")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok(); // 初期化

    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(|| {
        App::new()
          .service(hello_world)
    });

    // systemfdによってwatchしていた場合、そのhostとportを使用
    // そうでない場合、.envから読み込んだ環境変数を使用
    server = match listenfd.take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => {
            let host = env::var("HOST").expect("Please set host in .env");
            let port = env::var("PORT").expect("Please set post in .env");
            server.bind(format!("{}:{}", host, port))?
        }
    };

    server.run().await
}
