import './App.css';

import page1 from './assets/1.jpg';
import page2 from './assets/2.jpg';
import page3 from './assets/3.jpg';
import page4 from './assets/4.jpg';
import page5 from './assets/5.png';
import page6 from './assets/6.jpg';
import page7 from './assets/7.jpg';
import page8 from './assets/8.jpg';
import page9 from './assets/9.jpg';
import page10 from './assets/10.jpg';
import page11 from './assets/11.jpg';

import voice from './assets/voice.mp3';

import profile from './assets/lev profile.png';
import book from './assets/openbook.jpg';

import React, {Fragment} from "react";

//time: "min:sec"
const toSeconds = (time) => {
  const parts = time.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

const pages = [
  {
    img: page1,
    text: 'Къп',
    showPageNumber: false,
    audio: {
      start: toSeconds('0:05'),
      end: toSeconds('0:09')
    }
  },
  {
    img: page2,
    text: `Имаше в една хубава ферма с поточе, едно прасенце, което се казваше Къп.`,
    audio: {
      start: toSeconds('0:9'),
      end: toSeconds('0:24')
    }
  },
  {
    img: page3,
    text: `Той стоеше под едно голямо дърво и Локи (един гарван), привлече вниманиeтo му с махане на крилете си.
И Къп каза: Какво правиш Локи?
Локи му каза: Става зима и знаеш какво става с прасетата на зима?
Къп: Какво? Не знам!?
Локи: Познай ...!
`,
    audio: {
      start: toSeconds('0:40'),
      end: toSeconds('1:46'),
    }
  },
  {
    img: page4,
    text: `Къп: Не знам. Кажи ми!
Локи: Правят ги на месо. ХА-ХА-ХА!
Къп беше толкова много изплашен, че си събра вързопчето и ...`,
    audio: {
      start: toSeconds('1:46'),
      end: toSeconds('2:01')
    }
  },
  {
    img: page5,
    text: `... и тръгна да се спасява.
Хукна към горите с малкото си мече.
Събра си голяяяямата bagpack (раница), голяма колкото истински sperm whale (кашалот).`,
    audio: {
      start: toSeconds('2:01'),
      end: toSeconds('2:36')
    }
  },
  {
    img: page6,
    text: `Разбра, че трябва да пренощува в гората.
Чуваха се странни звуци, докато гушкаше силно неговата играчка мече.
Буууу-Бууу. Ауууууу.
Ставаше все по-тъмно`,
    audio: {
      start: toSeconds('2:40'),
      end: toSeconds('3:29')
    }
  },
  {
    img: page7,
    text: `Когато стана ден, той продължи да ходи.
Звука "Бууу-Бууу" продължаваше да се чува зад него.
Видя едни клони, които идваха точно към него, но се оказа, че е просто елен, който си търсеше листа за закуска.
I'm glad it's not a monster ... пфиу
`,
    audio: {
      start: toSeconds('3:29'),
      end: toSeconds('4:04')
    }
  },
  {
    img: page8,
    text: `Чу се момически глас да вика: "Къъп, Къъъъп"?
Прасенцето се уплаши, че хората от фермата са дошли да го вземат, за да го направят на месо.
Къп побягна с всичките си останали сили, но не видя и падна в една огромна черна дупка.
(връзка с космически черни дупки)
`,
    audio: {
      start: toSeconds('4:04'),
      end: toSeconds('4:47')
    }
  },
  {
    img: page9,
    text: `Момичето го взе на ръце и се върнаха във фермата.
Къп видя Локи да се смее на едно дърво и го попита: 
- Защо се смееш Локи? Ще ме направят на месо.
Локи каза: ХА-ХА-ХА! Пак се хвана на номера ми! Ти си домашен любимец и Теа те обича толкова много. ХАаааа!
Прасенцето беше шокирано. (звуци на шок)`,
    audio: {
      start: toSeconds('4:50'),
      end: toSeconds('5:45')
    }},
  {
    img: page10,
    text: `Къп се сети колко много Теа го обича, как се грижеше за него, къпеше го и му четеше истории.
Теа го зави, разказа му история и Къп заспа, заспа, заспа ...
`,
    audio: {
      start: toSeconds('6:00'),
      end: toSeconds('6:19')
    }
  },
  {
    img: page11,
    showPageNumber: false,
    text: `Край
Лев Дек. 2021`,
    audio: {
      start: toSeconds('6:25'),
      end: toSeconds('6:29')
    }
  }
];

const audio = new Audio(voice);
let stopAudioTimeout;

const Page = ({page, pageNumber}) => {

  return (
    <div className="page">
      <img src={page.img} alt="" width="1000px" height="700px" />
      <div className="shadow" />
      <div className="separator" />

      { page.text && (
        <div className="text">
          <p>{ page.text }</p>
        </div>
      ) }

      {
        page.showPageNumber !== false && <h5>СТРАНИЦА { pageNumber }</h5>
      }
    </div>
  )
}

const App = () => {
  const [currentPage, setCurrentPage] = React.useState(null);
  const [isAutoplayOn, setIsAutoplayOn] = React.useState(true);
  const isAudioDisabled = false;

  const playCurrentPageAudio = () => {
    if (isAudioDisabled || currentPage === null) return null;
    const page = pages[currentPage];
    audio.pause();

    audio.currentTime = page.audio?.start || 0;
    const timeToPlay = (page.audio?.end - page.audio?.start) || 1;

    audio.play();
    if (stopAudioTimeout) {
      clearInterval(stopAudioTimeout);
    }

    stopAudioTimeout = setTimeout(() => {
      audio.pause();

      if (isAutoplayOn) {
        nextPage();
      }
    }, timeToPlay * 1000);
  }

  const previousPage = () => {
    audio.pause();

    if (currentPage <= 0 || currentPage === null) {
      return;
    }

    setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
    audio.pause();

    if (currentPage >= (pages.length-1) || currentPage === null) {
      return;
    }

    setCurrentPage(currentPage + 1);
  }

  // const onKeydown = (e) => {
  //   if (e.code === "ArrowLeft") {
  //     previousPage();
  //   }
  //
  //   if (e.code === "ArrowRight") {
  //     nextPage();
  //   }
  // }
  //
  // React.useEffect(() => {
  //   window.addEventListener('keydown', onKeydown);
  //
  //   return () => {
  //     window.removeEventListener('keydown', onkeydown);
  //   };
  // });

  React.useEffect(playCurrentPageAudio, [currentPage]);

  return (
    <Fragment>
      { currentPage !== null && <div className="book" style={{ backgroundImage: `url(${book})` }} />  }

      <div className="app">
        {
          currentPage === null && (
            <div className="welcome">
              <img src={profile} width="293" height="293" />

              <button onClick={() => { setCurrentPage(0) }}>РАЗКАЖИ МИ ИСТОРИЯ »</button>

              <label className="autoplay">
                <input
                  checked={isAutoplayOn}
                  type="checkbox"
                  onClick={(e) => { setIsAutoplayOn(e.target.checked) }}
                />
                Автоматино прелистване
              </label>
            </div>
          )
        }

        { pages.map((page, index, allPages) => {
          if (currentPage !== index) {
            return null;
          }

          return (
            <Fragment key={index}>
              { (index !== 0) && (
                <div className="previous-button" onClick={previousPage}><div className="arrow left" /></div>
              ) }

              <Page page={page} pageNumber={index} onClick={() => playCurrentPageAudio()} />

              { index+1 < allPages.length &&
                <div className="next-button" onClick={nextPage}><div className="arrow right" /></div>
              }
            </Fragment>
          )
        }) }
      </div>
    </Fragment>
  );
}

export default App;
