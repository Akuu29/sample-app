table! {
    todos (id) {
        id -> Unsigned<Bigint>,
        title -> Varchar,
        description -> Varchar,
        done -> Bool,
    }
}
