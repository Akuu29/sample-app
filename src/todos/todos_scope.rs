use actix_web::{get, post, put, patch, delete, web, HttpResponse, Scope};
use serde_json::json;
use crate::todos::{NewTodo, Todo};
use crate::error_handler::CustomError;
use tera::{Tera, Context};

// pub fn get_scope() -> Scope {
//     web::scope("/todo")
//         .service(find)
//         .service(create)
//         .service(update)
//         .service(update_status)
//         .service(delete)
// }

#[get("/")]
async fn index(tmpl: web::Data<Tera>) -> Result<HttpResponse, CustomError> {
    let todos = Todo::find_all().unwrap();

    let mut context = Context::new();
    context.insert("todos", &todos);
    
    let response_body = tmpl
        .render("index.html", &context)
        .unwrap();
    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(response_body))
}

#[get("/todos")]
async fn find() -> Result<HttpResponse, CustomError> {
    let todos = Todo::find_all()?;
    // エラーハンドラ

    Ok(HttpResponse::Ok().json(todos))
}

// 作成
#[post("/todos")]
async fn create(params: web::Json<NewTodo>) -> Result<HttpResponse, CustomError> {
    let create_result = Todo::create(params.into_inner())?;
    // エラーハンドラ

    Ok(HttpResponse::Created().json(json!({"status": "success", "todo": create_result})))
}

// 編集
#[put("/todos")]
async fn update(params: web::Json<Todo>) -> Result<HttpResponse, CustomError> {
    let update_result = Todo::update(params.into_inner())?;
    // エラーハンドラ

    Ok(HttpResponse::Created().json(json!({"status": "success", "todo": update_result})))
}

// statusの更新
#[patch("/todos")]
async fn update_status(params: web::Json<Todo>) -> Result<HttpResponse, CustomError> {
    let update_status_result = Todo::update_status(params.into_inner())?;
    // エラーハンドラ

    Ok(HttpResponse::Created().json(json!({"status": "success", "todo": update_status_result})))
}

// 削除
#[delete("/todos")]
async fn delete(params: web::Json<Todo>) -> Result<HttpResponse, CustomError> {
    let delete_result = Todo::delete(params.into_inner())?;
    // エラーハンドラ

    Ok(HttpResponse::Created().json(json!({"status": "success", "todo": delete_result})))
}

// 作成したエンドポイントをserviceにセットして公開
pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(index);
    config.service(find);
    config.service(create);
    config.service(update);
    config.service(update_status);
    config.service(delete);
}