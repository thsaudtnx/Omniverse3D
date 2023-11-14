import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const SUPABASE_KEY = process.env.REACT_APP_ANON_KEY
const SUPABASE_URL = process.env.REACT_APP_PROJECT_URL
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
}

async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email : email,
    password: password,
    options: {
      emailRedirectTo: 'https//example.com/welcome'
    }
  })
}

async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
}


async function signOut() {
  const { error } = await supabase.auth.signOut()
}


async function handleSignInWithGoogle(response) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    token: response.credential,
    nonce: 'NONCE', // must be the same one as provided in data-nonce (if any)
  })
}

const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
      // ..
    },
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e',
      //..
    },
  },
  // You can also add more theme variations with different names.
  evenDarker: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#1e1e1e',
      defaultButtonBackgroundHover: '#2e2e2e',
      //..
    },
  },
}

const LoginPage = () => {
  return (
    <>
      Loginpage
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: customTheme }}
        theme="default"
        providers={['google']}
      />    
    </>
  )
}

export default LoginPage;