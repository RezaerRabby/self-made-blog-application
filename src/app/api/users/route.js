
// GET /api/users

export async function GET () {
const users = [
        {
  "id": 1,
  "name": "Rabby",
  "username": "rabby123",
  "email": "rabby@gmail.com",
  "password": "123456",
  "phone": "01700000000",
  "address": "Dhaka, Bangladesh",
  "role": "user",
  "profile_image": "default.png",
  "status": "active",
  "email_verified_at": null
},
{ 
  "id": 2,
  "name": "Hasan",
  "username": "hasan01",
  "email": "hasan@gmail.com",
  "password": "123456",
  "phone": "01811111111",
  "address": "Chittagong, Bangladesh",
  "role": "admin",
  // "profile_image": "default.png",
  "status": "active",
  "email_verified_at": null
},
{ 
  "id": 3,
  "name": "Karim",
  "username": "karim99",
  "email": "karim@gmail.com",
  "password": "123456",
  "phone": "01922222222",
  "address": "Sylhet, Bangladesh",
  "role": "user",
  // "profile_image": "default.png",
  "status": "inactive",
  "email_verified_at": null
},
{
  "id": 4,
  "name": "Rahim",
  "username": "rahim77",
  "email": "rahim@gmail.com",
  "password": "123456",
  "phone": "01633333333",
  "address": "Khulna, Bangladesh",
  "role": "user",
  // "profile_image": "default.png",
  "status": "active",
  "email_verified_at": null
},
{
  "id": 5,
  "name": "Nusrat",
  "username": "nusrat12",
  "email": "nusrat@gmail.com",
  "password": "123456",
  "phone": "01544444444",
  "address": "Rajshahi, Bangladesh",
  "role": "user",
  // "profile_image": "default.png",
  "status": "active",
  "email_verified_at": null
},
{
  "id": 6,
  "name": "Sakib",
  "username": "sakib10",
  "email": "sakib@gmail.com",
  "password": "123456",
  "phone": "01755555555",
  "address": "Barisal, Bangladesh",
  "role": "admin",
  // "profile_image": "default.png",
  "status": "active",
  "email_verified_at": null
},
{
  "id": 7,
  "name": "Tania",
  "username": "tania88",
  "email": "tania@gmail.com",
  "password": "123456",
  "phone": "01866666666",
  "address": "Rangpur, Bangladesh",
  "role": "user",
  // "profile_image": "default.png",
  "status": "inactive",
  "email_verified_at": null
},
{
  "id": 8,
  "name": "Imran",
  "username": "imran007",
  "email": "imran@gmail.com",
  "password": "123456",
  "phone": "01977777777",
  "address": "Dhaka, Bangladesh",
  "role": "user",
  // "profile_image": "default.png",
  "status": "active",
  "email_verified_at": null
},
{
  "id": 9,
  "name": "Farhan",
  "username": "farhan55",
  "email": "farhan@gmail.com",
  "password": "123456",
  "phone": "01688888888",
  "address": "Comilla, Bangladesh",
  "role": "user",
  // "profile_image": "default.png",
  "status": "blocked",
  "email_verified_at": null
},
{
  "id": 10,
  "name": "Mim",
  "username": "mim22",
  "email": "mim@gmail.com",
  "password": "123456",
  "phone": "01599999999",
  "address": "Noakhali, Bangladesh",
  "role": "user",
  // "profile_image": "default.png",
  "status": "active",
  "email_verified_at": null
}]
return  Response.json(users)

}

// GET /api/users/End



// POST /api/users

export async function POST (request) {
  const newUser = await request.json();
  return Response.json({ message: "User created successfully", user: newUser });
}

// POST /api/users/End

// PUT /api/users/:id

export async function PUT (request) {
  const updatedUser = await request.json();
  return Response.json({ message: "User updated successfully", user: updatedUser });
}

// PUT /api/users/:id End

// DELETE /api/users/:id

export async function DELETE (request) {
  const { id } = await request.json();
  return Response.json({ message: `User with id ${id} deleted successfully` });
}

// DELETE /api/users/:id End 



