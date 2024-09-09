import {
	Schema,
	model,
	connect,
	HydratedDocument,
	InferSchemaType,
	Types,
	Model,
} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
	name: string;
	email: string;
	avatar?: string;
	avatar1: string; // This will throw an error because it is not part of the IUser interface
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	avatar: String,
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

async function run() {
	// 4. Connect to MongoDB
	await connect('mongodb://127.0.0.1:27017/test-interface');

	const user = new User({
		name: 'Bill',
		email: 'bill@initech.com',
		avatar: 'https://i.imgur.com/dM7Thhn.png',
		avatar1: 'https://i.imgur.com/dM7Thhn.png',
	});
	await user.save();

	const user1: HydratedDocument<IUser> = new User({
		name: 'Bill',
		email: 'bill@initech.com',
		avatar: 'https://i.imgur.com/dM7Thhn.png',
	});

	console.log(user.email); // 'bill@initech.com'
	console.log(user1.email); // 'bill@initech.com'
	const users = await User.find();
	console.log(users);
	await User.deleteMany({});
}

run().catch((err) => console.log(err));

const inferSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	avatar: String,
});

type User = InferSchemaType<typeof inferSchema>;

const UserModel = model<User>('User', inferSchema);

UserModel.create({
	avatar: 'https://i.imgur.com/dM7Thhn.png',
	email: 'tienvv1234@gmail.com',
	name: 'tien',
});

interface BlogPost {
  _id: Types.ObjectId;
  title: string;
  content: string;
}

interface IUserM {
  tags: Types.Array<string>; // recommended way
  blogPosts: Types.DocumentArray<BlogPost>; // recommended way
//   blogPosts: BlogPost[]; //not working because we can't push to this array without remaning fields
}

const schema = new Schema<IUserM, Model<IUserM>>({
  	tags: [String],
 	blogPosts: [{ title: String }]
});

// const UserM = model<IUserM, Model<IUserM>>('User', schema);

const user = new UserM({ blogPosts: [] });

user.blogPosts.push({ title: 'test' }); // Would not work if you did `blogPosts: BlogPost[]`

///////////////

