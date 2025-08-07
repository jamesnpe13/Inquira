const Form = require('../models/Form');
const {
  createSection_validationSchema,
} = require('../validations/formValidations');

exports.createForm = async (req, res, next) => {
  try {
    const {
      created_by = '6891ee66093f3f5d1552a0c9',
      title,
      description,
      status,
      slug = 'asdafbqw8ebadb',
    } = req.body;

    const newForm = await Form.create({
      created_by,
      title,
      description,
      status,
      slug,
    });
    res.status(201).json(newForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createPage = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const pageData = req.body;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    form.pages.push(pageData);
    await form.save();

    return res.status(201).json({ message: 'Page added', pages: form.pages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.createSection = async (req, res, next) => {
  const { error, value } = createSection_validationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(error);
  }

  console.log('here');
  try {
    const { formId, pageId } = req.params;
    const sectionData = value; // { title, content, order }

    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ error: 'Form not found' });

    // Find the page inside pages array by _id
    const page = form.pages.id(pageId);
    if (!page) return res.status(404).json({ error: 'Page not found' });

    // Push new section
    page.sections.push(sectionData);

    await form.save();

    return res
      .status(201)
      .json({ message: 'Section added', sections: page.sections });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
