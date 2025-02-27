import { Schema, model, SchemaTypes } from 'mongoose';

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    thoughts: [{
        type: SchemaTypes.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: SchemaTypes.ObjectId,
        ref: 'user'
    }]
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
    toObject: {
        virtuals: true,
        versionKey: false,
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends?.length;
});

const User = model('user', UserSchema);

export default User;