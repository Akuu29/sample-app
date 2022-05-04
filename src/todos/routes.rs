use actix_web::{get, post, put, patch, delete, web, HttpResponse, http::header, Scope};
use crate::todos::{NewTodo, Todo};
use crate::error_handler::CustomError;
use tera::{Tera, Context};

// pub fn get_scope() -> Scope {
//     web::scope("/todo")
//         .service(find_all)
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
async fn find_all() -> Result<HttpResponse, CustomError> {
    let todos = Todo::find_all().unwrap();

    Ok(HttpResponse::Ok().json(todos))
}

// // 1件取得
// #[get("/todos/{id}")]
// async fn find(tmpl: web::Data<Tera>, id: web::Path<u64>) -> Result<HttpResponse, CustomError> {
//     let todo = Todo::find(id.into_inner())?;

//     let mut context = Context::new();
//     context.insert("todo", &todo);

//     let response_body = tmpl
//         .render("edit.html", &context)
//         .unwrap();
//     Ok(HttpResponse::Ok()
//         .content_type("text/html")
//         .body(response_body))
// }

// 作成
#[post("/todos")]
async fn create(params: web::Form<NewTodo>) -> Result<HttpResponse, CustomError> {
    Todo::create(params.into_inner())?;

    Ok(HttpResponse::SeeOther()
        .append_header((header::LOCATION, "/"))
        .finish())
}

// 編集
#[put("/todos")]
async fn update(params: web::Form<Todo>) -> Result<HttpResponse, CustomError> {
    Todo::update(params.into_inner())?;
    Ok(HttpResponse::SeeOther()
        .append_header((header::LOCATION, "/"))
        .finish())
}

// statusの更新
#[patch("/todos")]
async fn update_status(params: web::Form<Todo>) -> Result<HttpResponse, CustomError> {
    Todo::update_status(params.into_inner())?;
    Ok(HttpResponse::SeeOther()
        .append_header((header::LOCATION, "/"))
        .finish())
}

// 削除
#[delete("/todos")]
async fn delete(params: web::Form<Todo>) -> Result<HttpResponse, CustomError> {
    Todo::delete(params.into_inner())?;
    Ok(HttpResponse::SeeOther()
        .append_header((header::LOCATION, "/"))
        .finish())
}

// 作成したエンドポイントをserviceにセットして公開
pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(index);
    config.service(find_all);
    // config.service(find);
    config.service(create);
    config.service(update);
    config.service(update_status);
    config.service(delete);
}