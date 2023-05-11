// By default, Next.js components inside `app` are React Server Components
// https://nextjs.org/docs/app/building-your-application/routing#the-app-directory

import QueryGenerator from './QueryGenerator'
import { APP_DESCRIPTION } from '@/lib/constants'

export default function Home () {
  return (
    <div className='relative isolate mb-24 px-6 pt-14 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <h1>
          Query
          <span className='txt-color-primary'> GPT</span>
        </h1>

        <p className='txt-subtitle mb-6 mt-4 text-lg leading-8'>
          {APP_DESCRIPTION}
        </p>

        <QueryGenerator />
      </div>
    </div>
  )
}
