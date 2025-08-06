const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Form = require('../models/Form');
const Page = require('../models/Page');
const Section = require('../models/Section');

const {
  createForm_validationSchema,
  createPage_validationSchema,
  createSection_validationSchema,
  createField_validationSchema,
} = require('../validations/formValidations'); // single validation file

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
  await Form.deleteMany({});
  await Page.deleteMany({});
  await Section.deleteMany({});
});

describe('🧪 Mongoose Models', () => {
  it('creates and saves a Form', async () => {
    const form = new Form({
      created_by: new mongoose.Types.ObjectId(),
      title: 'Test Form',
      status: 'draft',
      slug: 'test-form',
      pages: [],
    });
    const saved = await form.save();
    expect(saved._id).toBeDefined();
    expect(saved.title).toBe('Test Form');
  });

  // You can add tests for Page and Section mongoose models similarly if needed
});

describe('🧪 Joi Validations', () => {
  it('validates a correct form object', () => {
    const validForm = {
      created_by: new mongoose.Types.ObjectId().toHexString(),
      title: 'My Form',
      status: 'published',
      slug: 'my-form',
      pages: [
        {
          order: 1,
          title: 'Page 1',
          sections: [
            {
              order: 1,
              title: 'Section 1',
              fields: [
                {
                  order: 1,
                  type: 'text',
                  label: 'Field 1',
                  is_required: true,
                },
              ],
            },
          ],
        },
      ],
    };
    const { error } = createForm_validationSchema.validate(validForm, {
      abortEarly: false,
    });
    expect(error).toBeUndefined();
  });

  it('fails validation on missing required fields', () => {
    const invalidForm = {
      created_by: '123',
      title: '',
      status: 'invalid',
      slug: '',
      pages: [
        {
          title: 'Page without order',
          sections: [
            {
              order: 'wrongType',
              fields: [
                {
                  order: 'noNumber',
                  type: 'badType',
                  label: '',
                },
              ],
            },
          ],
        },
      ],
    };
    const { error } = createForm_validationSchema.validate(invalidForm, {
      abortEarly: false,
    });
    expect(error).toBeDefined();
    const paths = error.details.map((d) => d.path.join('.'));
    expect(paths).toContain('created_by');
    expect(paths).toContain('title');
    expect(paths).toContain('status');
    expect(paths).toContain('slug');
    expect(paths).toContain('pages.0.order');
    expect(paths).toContain('pages.0.sections.0.order');
    expect(paths).toContain('pages.0.sections.0.fields.0.order');
    expect(paths).toContain('pages.0.sections.0.fields.0.type');
    expect(paths).toContain('pages.0.sections.0.fields.0.label');
  });
});
