import type { Config } from 'tailwindcss'
import flowbite from 'flowbite/plugin'

export default <Partial<Config>>{
  content: [
    "./node_modules/flowbite/**/*.{js,ts}",
    "./components/**/*.{js,ts,vue}",
  ],
  plugins: [flowbite],
}
