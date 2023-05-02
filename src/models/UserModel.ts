import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
	name: String;
	username: String;
	cpf: Number;
	email: String;
	password: String;
	comparePassword(password: string): Promise<boolean>;
	projects: String[];
	subscriptions: String[];
}

const UserModel = new mongoose.Schema(
	{
		name: String,
		subscriptions: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Project",
		},
		cpf: {
			type: Number,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		projects: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Project",
		},
	},
	{
		timestamps: true,
	},
);

UserModel.pre("save", async function (next) {
	return bcrypt
		.genSalt(10)
		.then((salt: any) =>
			bcrypt.hash(this.password as any, salt).then((hash: any) => {
				this.password = hash;
				next();
			}),
		)
		.catch(next);
});

UserModel.methods.comparePassword = async function (password: string) {
	const result = await bcrypt.compare(password, this.password);
	console.log(result);
	return result;
};

export default mongoose.model<IUser>("User", UserModel);
