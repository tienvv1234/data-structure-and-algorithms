### compound index
- query nhiều field phải index trên nhiều field
    Thứ từ trong compound index quan trọng
        - theo query chính xác > range query(createAt) > sort
        - Theo dât đa dạng nhiều > ít ()
        - Theo tần suất query nhiều > ít
        không tham index thưa nhiều field (2 đến 4 field thôi)
    - dùng partial index với các collection lơn
    - dùng hashed index với các field dài càn tìm kiếm chính xác (vd: token, uuid)
    - với các collection lớn, field it query khỏi index (dùng chung index)