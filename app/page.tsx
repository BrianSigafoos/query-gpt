// By default, Next.js components inside `app` are React Server Components
// https://nextjs.org/docs/app/building-your-application/routing#the-app-directory

import QueryGenerator from './QueryGenerator'
import { APP_TITLE, APP_DESCRIPTION } from '@/lib/constants'

export default function Home () {
  return (
    <div className='relative isolate px-6 pt-14 lg:px-8 mb-24'>
      <div className='mx-auto max-w-2xl text-center'>
        <h1>
          Query
          <span className="txt-color-primary"> GPT</span>
        </h1>

        <p className='txt-subtitle mt-4 mb-6 text-lg leading-8'>
          {APP_DESCRIPTION}
        </p>

        <QueryGenerator />
      </div>
    </div>
  )
}
