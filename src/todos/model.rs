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
pub struct Todo {
    pub title: String,
    pub description: String,
    pub done: bool,
}

// Queryable -> 構造にクエリを発行、実行できる特性を付与
#[derive(Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "todos"]
pub struct Todos {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub done: bool,
}

// リクエストデータからTodo構造体を作成する
impl Todo {
    fn from(todo: Todo) -> Todo {
        Todo {
            title: todo.title, 
            description: todo.description,
            done: todo.done,
        }
    }
}

impl Todos {
    // 全件取得
    pub fn find_all() -> Result<Vec<Self>, CustomError> {
        let conn = db::connection()?;
        let todos = todos::table.load::<Todos>(&conn)?;
        Ok(todos)
    }
    // id指定取得
    pub fn find(id: u64) -> Result<Self, CustomError> {
        let conn = db::connection()?;
        let todo = todos::table.filter(todos::id.eq(id)).first(&conn)?;
        Ok(todo)
    }
    // 作成
    pub fn create(todo: Todo) -> Result<usize, CustomError> {
        let conn = db::connection()?;
        let todo = Todo::from(todo);
        let todo = diesel::insert_into(todos::table)
          .values(todo)
          .execute(&conn)?;
        Ok(todo)
    }
    // 更新
    pub fn update(id: u64, todo: Todo) -> Result<usize, CustomError> {
        let conn = db::connection()?;
        let todo = diesel::update(todos::table)
          .filter(todos::id.eq(id))
          .set(todo)
          .execute(&conn)?;
        Ok(todo)
    }
    // 削除
    pub fn delete(id: u64) -> Result<usize, CustomError> {
        let conn = db::connection()?;
        let res = diesel::delete(todos::table.filter(todos::id.eq(id))).execute(&conn)?;
        Ok(res)
    }
}