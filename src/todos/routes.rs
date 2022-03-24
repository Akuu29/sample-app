use actix_web::{get, web, HttpResponse, Responder};
use crate::todos::{Todo};

// 全件取得
#[get("/todos")]
async fn find_all() -> impl Responder {
    let todos = vec![
        Todo {
            id: 1,
            title: "title".to_string(),
            description: "description".to_string(),
            done: false,
        },
        Todo {
            id: 2,
            title: "title".to_string(),
            description: "description".to_string(),
            done: true,
        }
    ];
    HttpResponse::Ok().json(todos)
}

// idより取得
#[get("/todos/{id}")]
async fn find() -> impl Responder {
    let todo = Todo {
        id: 2,
        title: "title".to_string(),
        description: "description".to_string(),
        done: true,
    };
    HttpResponse::Ok().json(todo)
}

// 作成したエンドポイントをserviceにセットして公開
pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(find);
}