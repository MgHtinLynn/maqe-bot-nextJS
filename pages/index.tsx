import { useState } from "react"
import Head from 'next/head'
import MAQEBot from '../src/services/maqeBotService'

export default function Home() {

    const [releaseResult, setReleaseResult] = useState(false);
    const [result, setResult] = useState({X: 0, Y: 0, Direction: 'North', success: false});
    const [direction, setDirection] = useState('');
    const [pasteShow, setPasteShow] = useState(true);
    const [error, setError] = useState(false);



    const paste = () => {
        navigator.clipboard
            .readText()
            .then((clipText) => (setDirection(clipText)));
    }
    const getResult = () => {
        setError(false)
        if (direction.length > 0) {
            const maqeBot = new MAQEBot();
            try {
                const result = maqeBot.walk(direction)
                setResult(result)
            } catch (err) {
                setError(true)
                console.log('err', err)
            }

            setReleaseResult(true)


        }
    }

    // reset all value
    const reset = () => {
        setReleaseResult(false)
        setResult({X: 0, Y: 0, Direction: 'North', success: false})
        setDirection('')
    }

    return (
        <>
            <Head>
                <title>MAQE Homework Challenge - MAQE Bot</title>
                <meta
                    name="description"
                    content="MAQE has built a robot called MAQE Bot which walks in 2-dimensional plane (X, Y coordinate). It can only turn left or right, and walk straight. It also knows of its current position (X, Y) as well as its direction (North, East, West and South). In order to command MAQE Bot to walk, it must be input with a walking command."
                />
            </Head>
            <main className="bg-slate-800 h-screen">
                <div className="font-sans mx-auto max-w-prose bg-slate-800">
                    <div className="pt-4 md:pt-12 pb-4">
                        <nav className="flex flex-wrap items-center justify-center px-2 mb-1 md:mb-6">
                            <div className="items-center justify-center md:block">
                                <div className="flex flex-col md:flex-row mr-auto w-full">
                                    <h1 className="text-3xl text-white font-bold">
                                        MAQE Homework Challenge - MAQE Bot
                                    </h1>
                                </div>
                            </div>
                        </nav>

                        <div className="mx-auto prose prose-stone">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                                    <div>
                                        <h2 className="text-lg font-medium leading-6 text-gray-900">MAQE Bot Form</h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            This is homework challenge from MAQE
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="relative col-span-6 sm:col-span-6">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Direction
                                            </label>
                                            <input
                                                type="text"
                                                name="direction"
                                                id="direction"
                                                value={direction}
                                                onChange={(e) => setDirection(e.target.value)}
                                                autoComplete="direction"
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                                            />
                                            <p onClick={paste} className="cursor-pointer absolute top-[50%] -translate-y-1/2 right-1 p-3 mt-2.5 hover:800">Paste</p>
                                        </div>
                                    </div>

                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={reset}
                                                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                                            >
                                                reset
                                            </button>
                                            <button
                                                type="button"
                                                onClick={getResult}
                                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                                            >
                                                Walk
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            releaseResult && (
                                <div className="mx-auto prose prose-stone mt-4">
                                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                                        <div className="space-y-6 bg-white py-4 px-4 sm:p-6">
                                            <h2>Result : </h2>
                                            {
                                                error ? (
                                                    <h3 className="text-red-500">Wrong Direction</h3>
                                                ): (
                                                    <ul>
                                                        <li>X: {result.X}</li>
                                                        <li>Y: {result.Y}</li>
                                                        <li>Direction: {result.Direction}</li>
                                                    </ul>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>


                </div>
            </main>
        </>



    )
}
