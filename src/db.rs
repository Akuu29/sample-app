use crate::error_handler::CustomError;
// mysqlのコネクションを作成するためのmoduleをインポート
use diesel::mysql::MysqlConnection;
// pool接続を行えるモジュールr2d2を用いてconnectionを確率する
use diesel::r2d2::ConnectionManager;
// staticなglobal変数を非同期に設定できるようにするmodule
use lazy_static::lazy_static;
use std::env;

type Pool = r2d2::Pool<ConnectionManager<MysqlConnection>>;
pub type DbConnection = r2d2::PooledConnection<ConnectionManager<MysqlConnection>>;

/*
 * deiselのマクロ
 * initないで呼ばれるrunによって、コネクションを作成した際にmigrationを流す必要がある場合、
 * 流してくれる。
 */
embed_migrations!();

lazy_static! {
    static ref POOL: Pool = {
        let db_url = env::var("DATABASE_URL").expect("Please set Database Url in .env");
        let manager = ConnectionManager::<MysqlConnection>::new(db_url);
        Pool::new(manager).expect("Failed to create db pool")
    };
}

pub fn init() {
    lazy_static::initialize(&POOL);
    let conn = connection().expect("Failed to get db connection");
    embedded_migrations::run(&conn).unwrap();
}

pub fn connection() -> Result<DbConnection, CustomError> {
    POOL.get()
      .map_err(|e| CustomError::new(500, format!("Failed getting db connection: {}", e)))
}
