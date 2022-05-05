use crate::db;
use crate::error_handler::CustomError;
use crate::schema::todos;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

/**
 * AsChangeset -> 構造にアップデートをかけられる特性を付与
 * Insertable -> 構造にデータ作成をできる特性を付与
 */
#[derive(Deserialize, Serialize, AsChangeset, Insertable)]
#[table_name="todos"]
pub struct NewTodo {
    pub title: String,
    pub description: String,
    pub done: bool,
}

// Queryable -> 構造にクエリを発行、実行できる特性を付与
#[derive(Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "todos"]
pub struct Todo {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub done: bool,
}

// リクエストデータからTodo構造体を作成する
// impl NewTodo {
//     fn from(todo: NewTodo) -> NewTodo {
//         NewTodo {
//             title: todo.title, 
//             description: todo.description,
//             done: todo.done,
//         }
//     }
// }

impl Todo {
    // 全件取得
    pub fn find_all() -> Result<Vec<Self>, CustomError> {
        let conn = db::connection()?;
        let todos = todos::table.load::<Todo>(&conn)?;
        Ok(todos)
    }
    // id指定取得
    pub fn find(id: u64) -> Result<Self, CustomError> {
        let conn = db::connection()?;
        let todo = todos::table.filter(todos::id.eq(id)).first(&conn)?;
        Ok(todo)
    }
    // 作成
    pub fn create(todo: NewTodo) -> Result<usize, CustomError> {
        let conn = db::connection()?;
        // let todo = NewTodo::from(todo);
        let todo = diesel::insert_into(todos::table)
          .values(todo)
          .execute(&conn)?;
        Ok(todo)
    }
    // 更新
    pub fn update(todo: Todo) -> Result<usize, CustomError> {
        let conn = db::connection()?;
        let todo = diesel::update(todos::table)
            .filter(todos::id.eq(todo.id))
            .set((
                todos::title.eq(todo.title),
                todos::description.eq(todo.description)
            ))
            .execute(&conn)?;
        Ok(todo)
    }
    // ステータス更新
    pub fn update_status(todo: Todo) -> Result<usize, CustomError> {
        let conn = db::connection()?;
        let todo = diesel::update(todos::table)
            .filter(todos::id.eq(todo.id))
            .set(todos::done.eq(todo.done))
            .execute(&conn)?;
        Ok(todo)
    }
    // 削除
    pub fn delete(todo: Todo) -> Result<usize, CustomError> {
        let conn = db::connection()?;
        let res = diesel::delete(todos::table.filter(todos::id.eq(todo.id))).execute(&conn)?;
        Ok(res)
    }
}