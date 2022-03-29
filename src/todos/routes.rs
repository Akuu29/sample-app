use actix_web::{get, post, put, delete, web, HttpResponse, ResponseError, http::header};
use crate::todos::{Todo, Todos};
use crate::error_handler::CustomError;
use serde_json::json;
use askama::Template;
use thiserror::Error;

#[derive(Template)]
#[template(path="index.html")]
struct IndexTemplate {
    todos:  Vec<Todos>,
}

#[derive(Error, Debug)]
enum MyError {
    #[error("Filed to render HTML")]
    AskamaError(#[from]askama::Error),
}

impl ResponseError for MyError {}

// 全件取得
#[get("/")]
async fn find_all() -> Result<HttpResponse, MyError> {
    let todos = Todos::find_all().unwrap();
    let html = IndexTemplate {todos};
    let response_body = html.render()?;
    Ok(HttpResponse::Ok()
      .content_type("text/html")
      .body(response_body))
}

// idより取得
#[get("/todos/{id}")]
async fn find(id: web::Path<u64>) -> Result<HttpResponse, CustomError> {
    let todo = Todos::find(id.into_inner())?;
    Ok(HttpResponse::Ok().json(todo))
}

#[post("/todos")]
async fn create(todo: web::Json<Todo>) -> Result<HttpResponse, CustomError> {
    let todo = Todos::create(todo.into_inner())?;
    Ok(HttpResponse::Ok().json(todo))
}

#[put("/todos/{id}")]
async fn update(id: web::Path<u64>, todo: web::Json<Todo>) -> Result<HttpResponse, CustomError> {
    let todo  = Todos::update(id.into_inner(), todo.into_inner())?;
    Ok(HttpResponse::Ok().json(todo))
}

#[delete("/todos/{id}")]
async fn delete(id: web::Path<u64>) -> Result<HttpResponse, CustomError> {
    let deleted_todo = Todos::delete(id.into_inner())?;
    Ok(HttpResponse::Ok().json(json!({"deleted": deleted_todo})))
}

// 作成したエンドポイントをserviceにセットして公開
pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(find);
    config.service(create);
    config.service(update);
    config.service(delete);
}