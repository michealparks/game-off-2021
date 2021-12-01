import Focus from './focus'
import { useComputer } from '../hooks/computer'
import Message from './message'

const Progress = () => {
  const [computer] = useComputer()
  const { control } = computer.context

  return (
    <div className='pointer-events-none fixed w-full bottom-0 sm:grid sm:place-content-center pb-4 text-white text-center'>
      <Message />
      <Focus />
      <div className='w-52 lg:w-72 mx-3 flex m-auto sm:justify-center flex-wrap text-xs sm:text-base'>
        <p className='flex text-center mb-1'>
          {control < 0.35
            ? 'catastrophic failure likeliness'
            : control < 0.75
            ? 'c̸atas̸tro̴p̴hic ̶ fail̶u̵re ̷ ̷ ̴ ̸ ̸ likelin̸e̵ss'
            : control < 0.9
            ?  'c̸a̵t̶a̴s̸t̴r̵o̵p̴h̴i̴c̵ ̶ ̷ ̸ ̶ ̵ ̸ ̷ ̵f̵a̴i̷l̸u̷r̴e̵ ̶ ̴ ̶ ̸ ̴ ̶ ̷ ̷ ̴ ̵l̸i̶k̷e̷l̴i̵n̸e̵s̸s̷'



            : 'ç̵̨̰̯̦̜͉͉̦͚̹̣̮̽̇̒̓͋͑͌̑́ͅą̴̢̡̲̩͖̠̹͔̱̇̅t̴͉̜̬͍̙̝͓̰̜͗̇̐̋͂̄̊́̐̓͆̀́̚͜ͅa̸̡̡̪̗̖̣̲̱̩͂͊́͐͋̈́̈́̀̚͠s̵̡̧̙͇͚̪̠͚̣͓͎̽̈́̈́̾̍͛͗͜͜͝ͅt̵̢̨̨̡͕̟̣͓̝̱̼̐r̴̘̱̫̹̈́̓̀̈́̐̄́̕͝͠ō̸̢̡̟̯̟̫̟͛̀̈́̄̕͝p̴̥̲̜̠̝̠̼̦̙̮͈̺͎͙̈́̓́̆̈́̈́͝h̷̼͖̩̄̽͊͑̌̀̅͗̋̄͠ī̷̧̯͍̦̟̦̥͖̹̣̩͕̔̓ĉ̷̯̝̫̬͓͚̪̜̰̻̘̟͕͇̖̀͝ ̶̭̻̙̏̐̉̕ ̴̢̮͚̭̪̙̯͇͔̹̘͉̒̉̓͛̉͂͜ͅ ̶̢̛̞͙͈̥͇̬̃͋̈́̿̈̋͊͆̋̕͠͝͝ ̴̢̰͎̭̊̈̓͐ͅ ̷͉͕̥͎͉̜̭̥͖͕̞̇̐̒̈́̎͂̓͒ ̸̱̺̬̩͎͈͉̐̿̈́̔̒̔̌͛̓̓͘̚͘ͅ ̵͕̻̩̲̞̼̰̺̼̈͛̾̀͐ ̸̡̡̬͓̜͉̔̍͒́̈̀́̓̓̆̎̈͗̕f̵̬̱̳̭̥̺͇̖̒̊͌̈̓͒͊ͅa̴͍̲̱͉͗͂̑̾̒͘͜į̶͙̩̖̥̦̻͙̺̫͚̊̋̂͆̒̀͗͛̎̈́͝ͅl̵͚̻͈̯͖̄̌͜u̴̜̮̯̭͂̈͒̄̅̌͒̀̏̿̈̆̈́͘ř̸̙̦̫̈́̒́e̴͙̳̼̘̺̟̯̘̣͚̲̺̝̖̰̾̅̇̒ ̶͓̓̅̃̊̏̀͂̌̄̀̈͘͝͠ ̵̻͉̬͕͙͖̳͓͊̈́̓̈́̿̏̏̐̆͛̓͋̀ ̵̤͙͎̮̦͇̈́ ̷͕̳̘̯̫̣͂̇̔̀ ̸͖͙̯͍̝̅̽͋̈̍̆̈́̓͂̕ ̶̢̧̣̮̙̗͓̀̌̆̀͊̀̏̈̆̐͠͝ ̶̢̟̗̙͎̱̭̗́͛̈͜ ̶͚̗̩͇͍̜̰͓̬͎͙͉͈̿̀̄̒́͜ ̴̧̛̛̺̘͉̳̮̘̮̮̠̱̹̳̼͖̽͂̀͌́̅͊̌́̽ ̷̡̠̩̫̣̝̫͉̠̭̹̝̋͑͛͑͒͑͆̊͑͘l̶̡̧̼̞̙̭̲͉̥̭͍͕̥̭̫̿̉̄̃͂͒̓̋̍͒̓̕͝͠͝į̸̠̤̀̓̒̐̂k̴͚̗̦͗̒͂̀ę̷̡̱͈͓͓̤͖͓͓̫̹͛̌́̆̐̓̅͘ĺ̸͜į̴̡̣͇̠̬̘͎̏͐̔̈́̇̃̀̉͝n̴̨̟͕̦̮̯̼̤̮͓̫͚͌̉̀̇͆́͋̀͘̚̕͜͠ę̶̨̡̘̳͍̟͌̐̈͆̈͒̈́͊͌̏̃̿̿͐͝ͅs̷͓͍̠̫̉̑̂̈́̄̂̔̔̀̚͝ş̷̛̼̭͍̙̩̜̰̰̍͋̋̋̅́͂̕'
          }
        </p>

        <div className='overflow-hidden relative rounded h-2 w-full bg-gray-800'>
          <div
            className='absolute top-0 left-0 w-full h-full bg-gray-600 origin-left transition-transform duration-200'
            style={{ transform: `scale(${computer.context.control}, 1)`}}
          />
        </div>
      </div>
      
    </div>
  )
}

export default Progress 