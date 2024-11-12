import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	lastName: {
		type: String,
		default: 'Last name',
	},
	location: {
		type: String,
		default: 'India',
	},
	role: {
		type: String,
		enum: ['influencer', 'brand', 'free_user', 'admin', 'sub_admin'],
		default: 'free_user',
	},
	categories: {
		type: [],
		default: [],
	},
});

UserSchema.methods.toJSON = function () {
	let obj = this.toObject();
	delete obj.password;
	return obj;
};

export default mongoose.model('User', UserSchema);
