use actix_web::{get, post, web, HttpResponse, http::header};
use crate::todos::{Todo, Todos};
use crate::error_handler::CustomError;
use tera::{Tera, Context};

#[get("/")]
async fn find_all(tmpl: web::Data<Tera>) -> Result<HttpResponse, CustomError> {
    let todos = Todos::find_all().unwrap();

    let mut context = Context::new();
    context.insert("todos", &todos);
    
    let response_body = tmpl
        .render("index.html", &context)
        .unwrap();
    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(response_body))
}

// 1件取得
#[get("/todos/{id}")]
async fn find(tmpl: web::Data<Tera>, id: web::Path<u64>) -> Result<HttpResponse, CustomError> {
    let todo = Todos::find(id.into_inner())?;

    let mut context = Context::new();
    context.insert("todo", &todo);

    let response_body = tmpl
        .render("edit.html", &context)
        .unwrap();
    Ok(HttpResponse::Ok()
        .content_type("text/html")
        .body(response_body))
}

// 作成
#[post("/todos")]
async fn create(params: web::Form<Todo>) -> Result<HttpResponse, CustomError> {
    Todos::create(params.into_inner())?;
    
    Ok(HttpResponse::SeeOther()
        .append_header((header::LOCATION, "/"))
        .finish())
}

// 編集
#[post("/todos/{id}/update")]
async fn update(id: web::Path<u64>, params: web::Form<Todo>) -> Result<HttpResponse, CustomError> {
    Todos::update(id.into_inner(), params.into_inner())?;
    Ok(HttpResponse::SeeOther()
        .append_header((header::LOCATION, "/"))
        .finish())
}

// 削除
#[post("/todos/{id}/delete")]
async fn delete(id: web::Path<u64>) -> Result<HttpResponse, CustomError> {
    Todos::delete(id.into_inner())?;
    Ok(HttpResponse::SeeOther()
        .append_header((header::LOCATION, "/"))
        .finish())
}

// 作成したエンドポイントをserviceにセットして公開
pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(find);
    config.service(create);
    config.service(update);
    config.service(delete);
}