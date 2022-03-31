use actix_web::{get, post, web, HttpResponse, ResponseError, http::header};
use crate::todos::{Todo, Todos};
use crate::error_handler::CustomError;
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

#[get("/")]
async fn find_all() -> Result<HttpResponse, MyError> {
    let todos = Todos::find_all().unwrap();
    let html = IndexTemplate {
        todos,
    };
    let response_body = html.render()?;
    Ok(HttpResponse::Ok()
      .content_type("text/html")
      .body(response_body))
}

#[get("/todos/{id}")]
async fn find(id: web::Path<u64>) -> Result<HttpResponse, CustomError> {
    let todo = Todos::find(id.into_inner())?;
    Ok(HttpResponse::Ok().json(todo))
}

#[post("/todos")]
async fn create(params: web::Form<Todo>) -> Result<HttpResponse, CustomError> {
    Todos::create(params.into_inner())?;
    /* 
     * header()
     * 既存のヘッダーにヘッダーを追加する
     * 
     * header::LOCATION
     * ページをリダイレクトするためのURLを示す
     * 
     * finish()
     * 空のボディを設定し、Responseを生成する
     * finish呼び出し後は、ResponseBuilderを使用することはできない
     */
    Ok(HttpResponse::SeeOther().header(header::LOCATION, "/").finish())
}

// 編集
#[post("/todos/{id}/update")]
async fn update(id: web::Path<u64>, params: web::Form<Todo>) -> Result<HttpResponse, CustomError> {
    Todos::update(id.into_inner(), params.into_inner())?;
    Ok(HttpResponse::SeeOther().header(header::LOCATION,  "/").finish())
}

// 削除
#[post("/todos/{id}/delete")]
async fn delete(id: web::Path<u64>) -> Result<HttpResponse, CustomError> {
    Todos::delete(id.into_inner())?;
    Ok(HttpResponse::SeeOther().header(header::LOCATION, "/").finish())
}

// 作成したエンドポイントをserviceにセットして公開
pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(find);
    config.service(create);
    config.service(update);
    config.service(delete);
}