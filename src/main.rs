#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;

use actix_web::{App, HttpServer};
use actix_web::middleware::Logger;
use actix_web::web::Data;
use dotenv::dotenv;
use listenfd::ListenFd;
use std::env;
use tera::Tera;

// moduleインポート
mod todos;
mod db;
mod error_handler;
mod schema;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // .envから環境変数ロード
    dotenv().ok();

    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(move || {
        App::new()
            .app_data(Data::new(Tera::new("templates/**/*").unwrap()))
            .service(actix_files::Files::new("/static", "./static"))
            .configure(todos::init_routes)
            // .service(todos::get_scope())
            .wrap(Logger::default())
    });

    // loggerを初期化
    env_logger::init();

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