// Dùng để cài đặt và chạy mongo
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {

//   await mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>console.log('MongoDB connected'))
//   .catch((err)=>console.log(err));

// }

// npm i mongodb 
// npm i mongoose
// npm i nodemon
//////////////////////////////////////////////////////////////////////////////////////////
// Dùng để tạo và test Monggooo
// const mongoose = require('mongoose');
// const readline = require('readline');

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/test');
//     console.log('MongoDB connected');

//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

//     rl.question('Enter user name: ', async (name) => {
//         rl.question('Enter user age: ', async (age) => {
//             const User = mongoose.model('User', {
//                 name: String,
//                 age: Number
//             });

//             const user = new User({ name, age });

//             try {
//                 await user.save();
//                 console.log('User inserted successfully:', user);
//             } catch (error) {
//                 console.log('Error inserting user:', error);
//             } finally {
//                 rl.close();
//                 mongoose.disconnect();
//             }
//         });
//     });
// }
/////////////////////////////////////////////////////////////////////////
// Dùng để chạy và xem mongo tại cmd
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('MongoDB connected');

    const User = mongoose.model('User', {
        name: String,
        age: Number
    });

    try {
        const user = await User.findOne({});
        console.log('Here is the record:');
        console.log(user);
    } catch (error) {
        console.log('Error retrieving user:', error);
    } finally {
        mongoose.disconnect();
    }
}