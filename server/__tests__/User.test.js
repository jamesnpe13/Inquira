const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const {
  createUser_validationSchema,
} = require('../validations/userValidations'); // Adjust path as needed

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('🧪 Section 1: Mongoose User Model', () => {
  it('creates and saves a valid user', async () => {
    const user = new User({
      first_name: 'James',
      last_name: 'Elazegui',
      email: 'james@example.com',
    });

    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe('james@example.com');
  });

  it('fails to save without required fields', async () => {
    const user = new User({ first_name: 'James' }); // missing last_name & email
    await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('fails with invalid email format', async () => {
    const user = new User({
      first_name: 'James',
      last_name: 'Elazegui',
      email: 'notanemail',
    });

    await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });
});

describe('🧪 Section 2: Joi User Validation', () => {
  it('validates correct data successfully', () => {
    const valid = {
      first_name: 'James',
      last_name: 'Elazegui',
      email: 'james@example.com',
    };

    const { error, value } = createUser_validationSchema.validate(valid, {
      abortEarly: false,
    });

    expect(error).toBeUndefined();
    expect(value.email).toBe(valid.email);
  });

  it('fails when required fields are missing', () => {
    const invalid = {
      first_name: 'James',
    };

    const { error } = createUser_validationSchema.validate(invalid, {
      abortEarly: false,
    });

    expect(error).toBeDefined();
    expect(error.details.some((d) => d.path.includes('last_name'))).toBe(true);
    expect(error.details.some((d) => d.path.includes('email'))).toBe(true);
  });

  it('fails with invalid email format', () => {
    const invalid = {
      first_name: 'James',
      last_name: 'Elazegui',
      email: 'wrong.email.com',
    };

    const { error } = createUser_validationSchema.validate(invalid, {
      abortEarly: false,
    });

    expect(error).toBeDefined();
    expect(error.details[0].path).toContain('email');
  });
});
