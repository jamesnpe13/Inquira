import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router';
import { useGlobalStore } from '../store/useGlobalStore';
import RecommendIcon from '@mui/icons-material/Recommend';
import DeleteIcon from '@mui/icons-material/Delete';
import DoorbellIcon from '@mui/icons-material/Doorbell';

export default function Homepage() {
  const { theme, setTheme } = useGlobalStore();
  const navigate = useNavigate();

  const handleLoginClick = () => navigate(ROUTES.login.path);
  const handleRegisterClick = () => navigate(ROUTES.register.path);
  const handleChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <div className='navbar container row gap-small bg-color-foreground padding-medium height-content drop-shadow-medium'>
        <div className='container gap-small row align-items-center'>
          <DoorbellIcon />
          <span>Inquira</span>
        </div>

        <div className='container push-right gap-small row align-items-center'>
          <button className='btn-icon btn-danger-transparent'>
            <RecommendIcon />
            <span>asdasd</span>
          </button>
          <button className='btn-icon'>
            <RecommendIcon />
          </button>
        </div>
      </div>

      <div className='container padding-medium overflow-auto scrollbar-hide grow-1'>
        <h1>Let's get started!</h1>
        <h2>Create a form</h2>
        <div className='panel'>
          <h3>Form 1</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere et voluptates consectetur magnam? Enim,
            culpa quidem qui nihil corrupti dolorum esse autem, id earum possimus eveniet doloribus modi temporibus
            neque!
          </p>
          <div className='container row wrap'>
            <button className='btn-danger grow-1'>Delete</button>
            <button className='btn-primary grow-1'>Submit</button>
            <button className='btn-secondary'>Edit</button>
          </div>
        </div>
        <h2>Here is another panel</h2>
        <div className='panel'>
          <h3>Heading 1</h3>
          <button className='btn-secondary content'>Details</button>
          <hr />
          <p className='padding-large'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia commodi sunt iure nostrum modi magnam,
            temporibus nam reiciendis earum vero deserunt ipsam illo ducimus veniam esse quos obcaecati veritatis
            cumque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo voluptates ratione, voluptate iste
            cupiditate alias, ad qui possimus quam reprehenderit laboriosam quis maxime praesentium minus in sunt
            doloremque dignissimos nostrum?
          </p>
          <div className='container row wrap'>
            <button className='btn-danger grow-1'>Delete</button>
            <button className='btn-secondary content'>Delete</button>
          </div>
        </div>
        <h2 className='control-width-max'>Here are your forms</h2>
        <div className='panel row'>
          <div className='container row wrap grow'>
            <button className='btn-secondary content grow'>Delete</button>
            <button className='btn-secondary content'>Delete</button>
            <button className='btn-secondary content'>Delete</button>
            <button className='btn-secondary content'>Delete</button>
          </div>
          <div className='container row width-min push-right'>
            <button className='btn-secondary content'>Delete</button>
            <button className='btn-primary content'>Delete</button>
          </div>
        </div>
        <button className='control-height-small' onClick={handleChangeTheme}>
          Toggle theme
        </button>
        <hr />
        <div className='panel'>
          <h3>Filters</h3>
          <div className='container row wrap'>
            <div className='chip'>Age</div>
            <div className='chip'>Address</div>
            <div className='chip'>City</div>
            <div className='chip'>Country</div>
            <div className='chip'>Date of birth</div>
            <div className='chip'>Random chip category</div>
          </div>
          <button className='primary'>
            <RecommendIcon />
            Icon
          </button>
          <button className='btn-danger'>
            <DeleteIcon />
            Delete form
          </button>
        </div>
        <div className='panel'>
          <h3>Text inputs</h3>
          <hr />
          <input type='text' placeholder='Text' />
          <input type='password' name='' id='' placeholder='Password' />
          <input type='number' name='' id='' placeholder='Number input' />
          <textarea name='' id='' placeholder='Textarea...'></textarea>
        </div>

        <div className='panel'>
          <h3>Date and time</h3>
          <hr />
          <input type='date' name='' id='' />
          <input type='time' name='' id='' />
        </div>

        <div className='panel'>
          <h3>Checkboxes</h3>
          <hr />
          <div className='container gap-medium row wrap'>
            <div className='container row align-items-center'>
              <input type='checkbox' name='' id='' />
              <span>Option</span>
            </div>
            <div className='container row align-items-center'>
              <input type='checkbox' name='' id='' />
              <span>Option</span>
            </div>
            <div className='container row align-items-center'>
              <input type='checkbox' name='' id='' />
              <span>Option</span>
            </div>
          </div>
        </div>

        <div className='panel'>
          <h3>Radio buttons</h3>
          <hr />
          <div className='container row gap-medium wrap'>
            <div className='container row align-items-center'>
              <input type='radio' name='choices' />
              <span>Option</span>
            </div>
            <div className='container row align-items-center'>
              <input type='radio' name='choices' />
              <span>Option</span>
            </div>
            <div className='container row align-items-center'>
              <input type='radio' name='choices' />
              <span>Option</span>
            </div>
          </div>
        </div>

        <hr />

        <h2>Survey #1</h2>

        <div className='panel'>
          <p className='italic'>This section is a required section. Please make sure to answer each field.</p>
          <h3>Personal information</h3>
          <hr />
          <p>Name</p>
          <input type='text' name='' id='' placeholder='Enter your first name' />
          <input type='text' name='' id='' placeholder='Enter your last name' />
          <p>Email</p>
          <input type='text' name='' id='' placeholder='Enter your email' />
          <p>Mobile</p>
          <input type='text' name='' id='' placeholder='Enter mobile' />
        </div>

        <div className='panel'>
          <p className='italic'>This section requires for your consent.</p>
          <h3>Personal consent</h3>
          <hr />
          <p>Do you agree to the terms and conditions outlined in the agreement?</p>

          <div className='container row align-items-center'>
            <input type='radio' name='agree' id='' />
            <span>I agree</span>
          </div>
          <div className='container row align-items-center'>
            <input type='radio' name='agree' id='' />
            <span>I do not agree</span>
          </div>
        </div>

        <div className='panel'>
          <h3>Search</h3>
          <hr />
          <input type='search' name='' id='' placeholder='Enter keyword...' />
        </div>
      </div>
    </>
  );
}
