1.เริ่มต้นใช้งาน
$sequelize init

2.generate file migrations (model)
$ sequelize model:generate --name Products --attributes "name:string, image:string, stock:integer" --underscored true

**-----** เริ่ม ยัดค่าเข้า DB ตาม ENV
1.สร้าง table จาก ไฟล์ใน migrations
$ sequelize db:migrate

2.genarate seed เพื่อเป็นคำสั่งลัดในการ seed data to Table ไม่ก็ ลบ data ออกจาก table ทั้งหมด
$ sequelize seed:generate --name seed-product

3.คำสั่ง ยัดข้อมูลเข้าฐานข้อมูล  all หมายถึงทุกไฟล์ seed
$ sequelize db:seed:all