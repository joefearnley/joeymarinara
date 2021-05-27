import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  const getEntries = () => {
    
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Joey Marinara - Cheese, Sauce, Crust, Opinion</title>
        <meta name="description" content="Joey Marinara - Cheese, Sauce, Crust, Opinion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.headerimage}>
        <Image src="/images/joey_marinara.png" alt="Joey Marinara" width={350} height={350} />
      </div>

      <main className={styles.main}>
        <div className={styles.grid}>

          <div className="post content">
            <img src="http://media.tumblr.com/tumblr_l27r5obs2N1qz98xr.png" />
            <div className="regular">
              <h2><a href="https://joeymarinara.com/post/172994420579/dave-and-busters">Dave and Buster’s</a></h2>
              <p>Last week was spring break for those of us in the Midwest and while everyone I knew was heading somewhere warm for the week, we did not have any plans to travel. My youngest isn’t in school yet, so he doesn’t count but my oldest was experiencing his first spring break from school. We decided to take a day trip to Grand Rapids and stay the night in a hotel with a pool.</p>
              <p>After a doctor’s visit for both of the boys we headed to G.R. arriving just in time for lunch. I’m not sure where the idea came from (maybe it was the recent non-stop watching of The Office) but Ray came up with the idea to go eat and kill some time at <a href="https://href.li/?https://www.daveandbusters.com/">Dave and Buster’s</a>.  Being that it was spring break we weren’t sure what if the place would be busy or not. We decided to eat lunch before we played any games so we skipped the token line and sat at our table.</p>
              <p className="pizzapic">
                <img src="https://farm1.staticflickr.com/876/41234750172_d1470a8c48.jpg" width="500" height="375" alt="Dave and Buster's" />
              </p>
              <p>I’ll be honest, the menu at <a href="https://href.li/?https://www.daveandbusters.com/">Dave and Buster’s</a> is comically over the top. You can order a burger with chicken wings on it, a bucket filled with ribs/fries/sliders, and even a pizza made with a quesadilla crust. Everything seemed like so much food so I offered to split something with Ray. She was pretty much dead set on these fried smothered with pulled pork and cheese, which I was not feeling, so I thought, what the hell? and ordered something called the Carnivore Pizzadilla - a pizza made with a multi-cheese filled quesadilla topped with pepperoni, sausage, and bacon.</p>
              <p className="pizzapic">
                <img src="https://farm1.staticflickr.com/889/27405672108_1c4a8888e9.jpg" width="500" height="375" alt="Dave and Buster's" />
              </p>
              <p>From first glance it looked like a normal pizza cut into eight slices. I didn’t know what to expect but it made for a pretty good combination. I thought it would be cheesier but it added a nice, chewy element to each slice. The topping were pretty basic but when blended together they created great flavor. It was a lot of food for an appetizer as I only ate three slices. It certainly could have been shared.</p>
              <p className="pizzapic">
                <img src="https://farm1.staticflickr.com/878/27405671048_be72fbd019.jpg" width="375" height="500" alt="Dave and Buster's" />
              </p>
              <p>Ultimately <a href="https://href.li/?https://www.daveandbusters.com/">Dave and Buster’s</a> was a total success. We ended up spending another hour after lunch there playing games and picking out prizes in the gift area. This was my first experience at one of the fine establishments and was a good one. Just picture Chuck-e-cheese but for adults. I know it sounds whack but you have to believe you will have a good time. Don’t be afraid of the Pizzadilla, I promise it won’t bite.</p>
              <p>Final Rating: 3 slices</p>
              <p><img src="https://64.media.tumblr.com/ddafb0369e2843adadbc6a6b13974a2a/tumblr_inline_pcqm0khFti1qz98xr_75sq.jpg" alt="image" width="70" height="70" /></p>
            </div>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        This is the Footer
      </footer>
    </div>
  )
}
