use actix_web::{get, post, put, delete, web, HttpResponse};
use crate::todos::{Todo, Todos};
use crate::error_handler::CustomError;
use serde_json::json;

// 全件取得
#[get("/todos")]
async fn find_all() -> Result<HttpResponse, CustomError> {
    let todos = Todos::find_all()?;
    Ok(HttpResponse::Ok().json(todos))
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