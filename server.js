const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const rooms = {
    "Left": { 
        "password": "", 
        "users": [], 
        "turnIndex": 0,
        "assets": {
            "left": "/Images/Allison.jpg",
            "right": "/Images/Pranav_app.jpg"
        }
    },
    "Right": { 
        "password": "", 
        "users": [], 
        "turnIndex": 0,
        "assets": {
            "left": "/Images/sam.jpg",
            "right": "/Images/Breanna.jpg"
        }
    }
};

const questionBank = {
    "Deep": [
        "What is a core memory from your childhood that you think shaped who you are today?",
        "If you could change one thing about how you were raised, what would it be?",
        "What is a fear you have that you rarely admit out loud to anyone?",
        "When was the last time you felt truly lonely, even if people were around you?",
        "What does success look like to you at this stage in your life?",
        "Do you believe people can genuinely change, or do they just get better at hiding things?",
        "What is a belief you held firmly five years ago that you completely disagree with now?",
        "If you died tomorrow, what would be your biggest regret about what you left unsaid or undone?",
        "What is something you are currently struggling with internally that I might not notice?",
        "How do you typically handle emotional pain—do you process it, distract yourself, or bury it?",
        "What is the hardest lesson you’ve ever had to learn the hard way?",
        "Do you think you are more like your mother or your father, and how do you feel about that?",
        "What is something you’re proud of that you don’t usually brag about?",
        "What does forgiveness mean to you? Is there anyone you haven't forgiven?",
        "If a crystal ball could tell you the truth about your future, what would you want to know?",
        "What is your absolute favorite quality about yourself?",
        "What is something you find yourself constantly worrying about, even though it’s out of your control?",
        "How do you think your younger self would view the person you are today?",
        "What is a boundary you’ve set recently that was really hard for you to enforce?",
        "What gives your life the ultimate sense of meaning or purpose?",
        "What is an assumption people frequently make about you that is totally wrong?",
        "If you could heal one past emotional wound instantly, which one would it be?",
        "What does home mean to you—is it a place, a person, or a state of mind?",
        "What is a dream you’ve given up on, and do you regret letting it go?",
        "How do you want to be remembered by the people closest to you when you’re gone?",
        "Piece of advice you received that completely changed the trajectory of your life?",
        "When you are in a bad mood, do you prefer space to process or do you want to be distracted?",
        "What is the most emotionally exhausting thing about your day-to-day routine right now?",
        "Do you think you judge yourself more harshly than you judge other people, or vice versa?",
        "What is something you had to let go of in the past year that was incredibly painful but necessary?",
        "If you could ask a single question to an omniscient being and get a completely honest answer, what would you ask?",
        "What does financial security mean to you emotionally? Does it represent freedom, safety, or status?",
        "What is a personal rule or boundary you have set for yourself that you will never break?",
        "When was the last time you cried, and what was the underlying reason behind those tears?",
        "Do you think people are inherently good, inherently selfish, or just products of their environment?",
        "What is an area of your life where you feel like you are currently settling or compromising too much?",
        "How do you handle criticism? Does it make you defensive, or do you internalize it deeply?",
        "What is a trait you see in other people that instantly makes you lose respect for them?",
        "If you could go back and talk to yourself on the first day of high school, what would you say?",
        "What is something you’re currently trying to forgive yourself for?",
        "Do you find it easy or difficult to ask for help when you are drowning in tasks or emotions?",
        "What is a major life goal you used to have that you realized you no longer care about at all?",
        "What is the closest you have ever felt to a spiritual or transcendent experience?",
        "How do you typically react when a plan you were incredibly excited about falls through at the last minute?",
        "What is an aspect of your personality that you actively try to hide or tone down around new people?",
        "If you could instantly acquire one character trait or emotional skill that you lack, what would it be?",
        "What does peace of mind look like to you in a practical, everyday sense?",
        "What is a memory you have that always makes you feel instantly angry or frustrated when it pops up?",
        "Do you feel like you are living your life for yourself right now, or are you living it to fulfill others' expectations?",
        "What is the most profound realization you’ve ever had about yourself during a period of solitude?",
        "What is an insecurity you had as a teenager that you completely outgrew, and how did you do it?",
        "Do you think it is more important to be respected by your peers, loved by your family, or satisfied with yourself?",
        "What is a piece of art, a book, or a movie that fundamentally shifted the way you view human nature?",
        "How do you handle feelings of jealousy or envy when you see someone else achieving what you want?",
        "What is something you think you are currently taking for granted in your life right now?",
        "If you could undo one decision you made in the last three years, which one would it be and why?",
        "What does the concept of aging mean to you? Does it scare you, or do you look forward to it?",
        "When was the last time you felt like an absolute impostor, and how did you push through that feeling?",
        "What is a truth about yourself that you try very hard to avoid thinking about?",
        "Do you think your current career path or daily routine aligns with what you genuinely value in life?",
        "What is the most significant sacrifice you have ever made for another person, and do you regret it?",
        "How do you find closure when a situation or a relationship ends without a proper explanation?",
        "What is a specific compliment or piece of validation you received that made you feel truly seen as a person?",
        "Do you struggle more with letting go of the past or worrying about what’s going to happen in the future?",
        "What is a habit or defense mechanism you have that you know is toxic but find incredibly hard to break?",
        "If you had to describe your current emotional state as a weather pattern, what does it look like right now?",
        "What is a lesson about love or relationships that you had to unlearn because it was holding you back?",
        "When you look at the world today, what gives you the most genuine sense of hope for the future?",
        "What is something you used to find incredibly embarrassing that you now find completely normal or even endearing?",
        "How do you define a life well-lived? What are the non-negotiable metrics for you?",
        "What is a secret burden or responsibility you carry that you rarely talk to anyone about?",
        "Do you think you are fundamentally a private person, or do you crave deep vulnerability with multiple people?",
        "What is a personal failure that you are now deeply grateful happened because of where it led you?",
        "If you could instantly master any emotional discipline (like patience, stoicism, or radical empathy), which one would you choose?",
        "What is the most beautiful thing you have ever witnessed another human being do for someone else?",
        "What is a piece of advice you gave someone else that you desperately wish you could take yourself?",
        "Do you think it’s possible to love someone fully without completely understanding them?",
        "What is the most significant way your priorities have shifted over the last two years?",
        "If you had to describe your relationship with your own mind right now, is it a peaceful place or a battleground?",
        "What is something you think you are trying to prove to the world, and who are you trying to prove it to?",
        "When was the last time you felt a deep sense of envy, and what did it reveal about what you feel you are lacking?",
        "What is a belief or tradition from your family or culture that you have intentionally decided to drop?",
        "If you were forced to live a year of your life in complete isolation, what part of your daily routine would you miss the most?",
        "What is an experience that made you realize you are much stronger or more resilient than you gave yourself credit for?",
        "Do you think you are more prone to over-thinking things until they break, or under-thinking things until they surprise you?",
        "What is a truth about your current mental health or emotional state that you’ve been hiding behind a smile?",
        "If you could see a chart of how you’ve spent your energy over the last year, what category do you think would be dangerously high?",
        "What is something you used to judge others heavily for that you now look at with a lot of empathy and understanding?",
        "How do you handle it when someone you care about deeply makes a massive life choice that you completely disagree with?",
        "What does loyalty mean to you in a practical sense, and what is the ultimate betrayal of that loyalty?",
        "What is an unfulfilled dream of yours that you are terrified to start because you are scared of failing publicly?",
        "Do you find it harder to accept a sincere compliment from someone or to accept a constructive piece of criticism?",
        "What is a specific memory from your childhood that makes you feel instantly safe and protected just thinking about it?",
        "If you had to look at your biggest flaws, which one do you think is actually a twisted version of your greatest strength?",
        "What is an absolute non-negotiable value for you when it comes to the type of people you choose to surround yourself with?",
        "How do you typically react when someone calls you out on a mistake you know you actually made?",
        "What is a question about the universe or existence that keeps you up staring at the ceiling late at night?",
        "Do you think true contentment comes from wanting less or achieving more?",
        "What is a burden or worry you are carrying right now that you would love to just hand over to someone else for a single day?",
        "If you could summarize the most important lesson life has taught you up to this exact moment, what would it be?"
    ],
    "Fun": [
        "If you had to enter a competitive eating contest, what food would you choose to stuff your face with?",
        "What is the absolute worst fashion phase you ever willingly went through?",
        "If you were a ghost haunting a house, what mild inconveniences would you cause the new owners?",
        "What is your most useless, random talent or party trick?",
        "If you could swap lives with any fictional character for a week, who would it be?",
        "What is the weirdest food combination that you swear is actually delicious?",
        "If you were arrested with no explanation, what would our friends and family assume you did?",
        "What is a popular trend, movie, or show that everyone loves but you secretly hate?",
        "If you could only use three apps on your phone for the rest of your life, which ones survive?",
        "What would your ultimate, money-is-no-object theme park look like?",
        "What is the dumbest way you’ve ever injured yourself?",
        "If you were a superhero, what would your highly specific, slightly underwhelming superpower be?",
        "What is the funniest or most embarrassing thing that has happened to you in public?",
        "If you won 10 million dollars tomorrow, what is the very first completely ridiculous, unnecessary thing you’d buy?",
        "What is your absolute go-to karaoke song when you’ve had a drink or two?",
        "If you had to survive a zombie apocalypse, which three people we know are on your team?",
        "What is a commercial, jingle, or meme that is permanently rented space in your brain?",
        "What’s the worst movie you have ever watched from start to finish?",
        "If you could talk to one species of animal, which one would you choose and what would you ask them?",
        "What is your most controversial opinion about something completely trivial (like cereal or toilet paper orientation)?",
        "If your pet could suddenly talk for five minutes, what is the first thing they’d roast you for?",
        "What was your very first screen name, gamertag, or email address?",
        "If you had to dress up in a couples' costume for Halloween, what is your dream duo?",
        "What is the most ridiculous lie you were told as a kid that you believed for way too long?",
        "If you were forced to replace your left hand with an object instead of a prosthetic, what object would be the funniest or most useful?",
        "What is a specific smell that you absolutely love, even though most people would find it weird or gross?",
        "If you had to create a signature cocktail named after your current lifestyle, what would be the ingredients and the name?",
        "What is the most ridiculous hill you are absolutely willing to die on?",
        "If you could have any mythical creature as a fully trained, well-behaved house pet, what are you picking?",
        "What is the most chaotic thing you have ever witnessed happen at a grocery store or mall?",
        "If you had to dress exclusively in one color for the next five years, which color are you choosing?",
        "What is a skill or hobby that looks incredibly cool when other people do it, but looks completely tragic when you try?",
        "If you were a wrestler, what would be your dramatic walk-out song and your signature move?",
        "What is the most bizarre dream you’ve ever had that you can still remember perfectly today?",
        "If you could delete one single invention from human history so it never existed, what would it be?",
        "What is the absolute worst meal you have ever cooked for yourself or someone else?",
        "If you were guaranteed to be completely immune to the law for exactly one hour, what is your master plan?",
        "What is a luxury item or experience that you think is a total scam and completely overhyped?",
        "If you could instantly become a world-class expert in one incredibly specific trivia category, what would it be?",
        "What is the most embarrassing song on your current playlist that you would immediately skip if someone else got in the car?",
        "If you had to spend a week living inside any video game universe, which one gives you the best odds of survival?",
        "What is the dumbest argument you have ever gotten into with a friend or family member?",
        "If you had to pick one reality TV show to be a contestant on, which one do you think you’d actually win?",
        "What is a weird childhood habit or ritual that you secretly kept doing way longer than you should have?",
        "If you were given a million dollars but you had to spend it all inside a single dollar store in 24 hours, what are you buying?",
        "What is your absolute ultimate comfort food when you are sick, sad, or just totally exhausted?",
        "If you could swap voices with any celebrity for a month, whose voice are you stealing?",
        "What is the strangest or most useless piece of random information you have stored in your brain?",
        "If you were forced to open a niche museum, what specific collection or theme would your museum showcase?",
        "If you had to delete one social media platform from the internet forever, which one is going down?",
        "What is the most ridiculous thing you bought online while completely bored or sleep-deprived?",
        "If you were forced to live in a house shaped like a giant food item, what food are you choosing?",
        "What was your absolute favorite toy or cartoon character as a kid that you were oddly obsessed with?",
        "If you could have the entire cast of any TV show show up to your birthday party, which show are you picking?",
        "What is the most illegal-feeling thing that is completely legal to do?",
        "If you had to replace your car horn with a sound effect or a movie quote, what would it be?",
        "What is the weirdest or most specific rule your parents had in your house growing up?",
        "If you were a chef opening a restaurant that only serves one single dish cooked 50 different ways, what is the dish?",
        "What is a movie that you know is absolute trash, but you will still sit down and watch it if it’s on?",
        "If you could instantly learn to play any musical instrument perfectly, but you could only play it while standing on one foot, what instrument is it?",
        "What is the most useless piece of advice a teacher or mentor ever gave you?",
        "If you were forced to participate in a reality TV show about wilderness survival, how many days do you honestly last?",
        "What is a popular food item that you think smells amazing but tastes absolutely terrible?",
        "If you could turn any everyday chore (like folding laundry or washing dishes) into an Olympic sport, which one would you win a gold medal in?",
        "What is the most embarrassing thing you have ever accidentally said to a stranger?",
        "If you could have a conversation with any historical figure, but you have to do the entire interview in a terrible accent, who are you talking to?",
        "What is your absolute biggest, pettiest pet peeve when it comes to driving or traffic?",
        "If you were a mad scientist, what two animals are you cross-breeding to create the ultimate chaotic creature?",
        "What is the worst haircut or hairstyle you have ever actively rocked in your life?",
        "If you could command a small army of 500 tiny creatures (like squirrels or frogs), what is your first mission?",
        "What is a conspiracy theory that is completely harmless but you secretly find hilarious or convincing?",
        "If you had to give a 20-minute presentation right now with absolutely zero preparation, what topic are you talking about?",
        "What is the most ridiculous lie you have ever told to get out of a social commitment?",
        "If your current state of mind was represented by a cartoon sound effect, what sound would it be right now?",
        "If you were forced to rename yourself after a household appliance, what name are you going by?",
        "What is the most ridiculous or dramatic reason you have ever seen a child throw a massive temper tantrum in public?",
        "If you could command a single flock of 100 birds to follow someone around for a day, who is your target?",
        "What is a popular movie quote that you constantly use in conversation, even if nobody else gets the reference?",
        "If you were an NPC (Non-Player Character) in a video game, what repetitive line would you mutter whenever someone walks past you?",
        "What is the single worst or most disappointing text message you have ever received from a wrong number?",
        "If you had to create a fake holiday dedicated entirely to your favorite lazy activity, what is it called and how do we celebrate?",
        "What is a completely harmless thing that always makes you feel like an absolute criminal when you do it?",
        "If you had to choose one flavor of ice cream to be completely wiped off the face of the Earth forever, which one is going down?",
        "What is the most absurd or useless item you have ever successfully sold or bought at a garage sale or online marketplace?",
        "If you were given a million dollars but could only spend it on upgrading a single room in our house to a ridiculous extreme, which room gets the upgrade?",
        "What is your absolute ultimate, non-negotiable rule when it comes to the perfect movie theater snacking experience?",
        "If you could instantly summon one fast-food item to appear in your hand right now out of thin air, what are we eating?",
        "What is a kids' movie or show that you watched recently that you think is genuinely better written than most adult entertainment?",
        "If you had to spend an entire week speaking exclusively in rhymes, how long do you think you’d last before losing your mind?",
        "What is the most dramatic, over-the-top way you have ever seen someone quit a job or a school project?",
        "If you were a superhero whose powers were entirely determined by the last thing you ate, what is your superhero name and ability?",
        "What is a weirdly specific talent or piece of knowledge you have that is completely useless unless you are in a very specific scenario?",
        "If you had to replace all the windows in our house with stained glass depicting a single meme, which meme are we showcasing to the neighborhood?",
        "What is the single funniest or most chaotic misunderstanding you have ever had because of a text message typo?",
        "If you were forced to live a year of your life inside a specific decade from history, which era has the best vibe for you?",
        "What is a massive, widely accepted social norm that you think is completely stupid and wish we would all just stop doing?",
        "If you were a professional standard-size wrestler, what would be your incredibly intimidating signature entrance outfit?",
        "What is the most ridiculous lie a salesperson or commercial ever successfully convinced you to buy into?",
        "If you could create a brand new, highly chaotic Olympic sport using only items found in a typical kitchen, what are the rules?"
    ],
    "Spicy": [
        "What is a fantasy or scenario you’ve thought about but haven't actually told me yet?",
        "Where is the most adventurous or riskiest place you’ve ever thought about doing it with me?",
        "What is something I do in bed that instantly drives you crazy or turns you on?",
        "If you could choose exactly what I wear to bed tonight, what would it be?",
        "What is your favorite time of day to get intimate—morning, afternoon, or late night?",
        "What is a specific touch, look, or phrase I use that signals to you that I'm in the mood?",
        "Do you prefer it when things are slow, romantic, and gentle, or fast, rough, and passionate?",
        "What is the best sex we’ve ever had, in your opinion? Describe that memory.",
        "What is a part of your body that you consider an underrated turn-on when touched?",
        "How do you feel about dirty talk—does it turn you on, or does it make you laugh?",
        "If we were to buy a new toy, outfit, or accessory together, what category are you looking at first?",
        "What is a sexual boundary or hard no for you that you want to make sure we always respect?",
        "What is something you’ve watched or read that unexpectedly turned you on?",
        "If you could choose one place outside of the bedroom for us to hook up right now, where would it be?",
        "What is your favorite position, and what do you love most about it?",
        "How do you feel about roleplay, and is there a specific character or dynamic you’d want to try?",
        "What is the most memorable dream you’ve ever had about me?",
        "What is something I could do during the day to build anticipation for later tonight?",
        "Do you like being in complete control, giving up control, or switching it up?",
        "What is a physical feature of mine that you find yourself staring at when you're feeling playful?",
        "What is your opinion on public displays of affection (PDA)—how much is too much?",
        "If you could give me an explicit command right now that I had to follow, what would it be?",
        "What is a sensory trigger that gets you in the mood (a specific scent, lighting, music, temperature)?",
        "What is the most satisfying part of our intimate life right now, and what’s one thing you want more of?",
        "If we could only use our hands and mouths tonight, what would you want me to do to you first?",
        "What is a part of my body that you think doesn't get enough attention when we get intimate?",
        "If you could script the perfect morning-after scenario with me, what does it look like from the moment we wake up?",
        "What is the absolute wildest or most daring thing we have ever done together physically?",
        "If I told you I wanted to try something completely new in bed tonight, what is the first thing you'd hope it was?",
        "What is your favorite type of lingerie, clothing, or style that you find completely irresistible on me?",
        "Do you prefer the lights completely on, totally pitch black, or somewhere moody in between?",
        "What is a specific memory of us hooking up that randomly pops into your head during the workday?",
        "How do you feel about the idea of blindfolds, restraints, or mild sensory deprivation?",
        "What is the biggest physical turn-off for you that can instantly ruin the mood, no matter how hot things are?",
        "If you could choose one song to play in the background right now while we make out, what are we putting on?",
        "What is a fantasy you have that involves a specific location or setting outside of our house?",
        "Do you like it when I take the initiative and am aggressive, or do you prefer to take charge and dictate the pace?",
        "What is something you like me to do with my hands while we are intimately connected?",
        "If we were playing a game where every piece of clothing removed required a truth, how fast would you try to win?",
        "What is your honest opinion on quickies—do you find them incredibly exciting, or do you prefer a long build-up?",
        "What is a text message or picture I could send you while you're at work that would make it impossible for you to focus?",
        "When we are kissing, what is the difference between a 'romantic' kiss and a kiss that means I want you right now?",
        "What is a part of your own body that you feel the most confident or sexy about when we are together?",
        "If you could choose anywhere on my body for a slow, teasing massage tonight, where are you starting?",
        "What is something we used to do early on in our physical relationship that you miss or want to bring back?",
        "Do you find eye contact during intimacy to be intensely hot, or does it make you feel a little too exposed?",
        "What is a boundary you’ve thought about pushing slightly with me, just to see how it feels?",
        "If you could describe my sexual energy or vibe in bed using a single word, what would it be?",
        "What is the most unexpected thing I’ve ever done during sex that turned you on immensely?",
        "If we had the entire house to ourselves for a full 24 hours, how many times do you think we’d end up hooking up?",
        "What is a specific physical position or angle we haven't tried yet that you’ve been curious about?",
        "If we were to set a timer for exactly five minutes, what is the most teasing thing you would do to me?",
        "What is something you think I do completely naturally that makes me look incredibly sexy, even when I’m not trying?",
        "If we were to make a playlist specifically for the bedroom, what are the first three songs you are adding?",
        "How do you feel about the idea of ice, heat creams, or playing with different temperatures during intimacy?",
        "What is a part of my body that you feel is completely underappreciated by anyone else, but turns you on instantly?",
        "If you could text me a single word right now to tell me exactly what you want to do to me later, what word are you choosing?",
        "What is your favorite type of lighting when we are getting physical—candles, neon lights, or dim lamps?",
        "Do you prefer it when I am slow and teasing with my touch, or when I move with absolute certainty and urgency?",
        "What is the most explicit or memorable dream you have ever had about us that you haven't shared yet?",
        "If you could choose one piece of clothing of mine that you get to rip or tear off tonight, what is it?",
        "What is a fantasy of yours that involves a mirror, and how do you want us to use it?",
        "How do you feel about the concept of a slow burn—spending hours teasing each other throughout the day before actually touching?",
        "What is something you’ve always wanted to say to me while we are in the middle of sex, but haven’t quite had the confidence to blurts out?",
        "If you could choose a specific location in a hotel or a vacation spot for us to get adventurous, where would it be?",
        "What is a physical sensation (like a scratch, a bite, or a pull) that you find unexpectedly arousing?",
        "If you could watch a video playback of any single intimate moment we’ve ever shared, which one are you picking?",
        "What is your honest opinion on shower sex—is it highly romantic and hot, or is it just a logistical nightmare?",
        "What is something I do with my eyes or my expression when we are hooking up that completely gives away how much pleasure you're giving me?",
        "If you had to choose between me being completely vocal or completely silent during intimacy tonight, which one turns you on more?",
        "What is a secret trigger or thought that can instantly get you in the mood, even if you were completely distracted a minute before?",
        "If we were playing a game where the winner gets to dictate every physical move for the next hour, how competitive are you going to get?",
        "What is a specific type of fabric or material (like silk, leather, or lace) that you find intensely sexy to touch on my skin?",
        "If you could give me a massage tonight with absolutely no expectations of it leading anywhere, where would you want to spend the most time touching me?",
        "What is the most intense wave of pleasure you think we have ever shared together in a single moment?",
        "If you could lock me in a room with you tonight and tell me exactly three things I am not allowed to do, what are the rules?",
        "What is a specific physical feature of mine that you think gets significantly sexier when we are in the heat of the moment?",
        "If we were to try a completely different setting for intimacy tonight—like the kitchen counter or the living room floor—where are you picking?",
        "What is the most teasing or provocative thing I could whisper in your ear while we are out at a crowded dinner party?",
        "How do you feel about the idea of using mirrors to watch ourselves while we are intimately connected?",
        "What is a specific memory of us hooking up that you think about whenever you need a quick mental escape during a stressful day?",
        "If you could choose a specific outfit for me to wear around the house today with absolutely nothing underneath it, what am I wearing?",
        "What is your honest opinion on giving or receiving a lap dance—is it something you’d want to try with me tonight?",
        "What is a part of your body that you think is an incredibly sensitive turn-on, but we rarely focus on it during sex?",
        "If you could script the absolute perfect, uninterrupted 3-hour window for us to just focus on physical pleasure, how does it start?",
        "Do you prefer the intensity of making out when we are both completely breathless, or a slow, deep, intense kiss that lingers?",
        "What is a specific text message or photo I could send you right now that would guarantee you’re thinking about bed for the rest of the evening?",
        "If we were playing a game where every time you touch me, you have to use a different part of your body (hands, lips, tongue), where are you starting?",
        "What is a fantasy or scenario from a movie or a book that you secretly want us to recreate together in real life?",
        "How do you feel about the concept of edge-playing or deliberately delaying pleasure to make the final moment infinitely more intense?",
        "What is something I do with my breathing or my voice when things get intense that drives you completely wild?",
        "If you could choose one place outdoors where we could guaranteed not get caught, what adventurous backdrop are you choosing?",
        "What is a specific type of touch—like a light trace of the fingernails or a firm grip—that gives you instant goosebumps?",
        "If you had to describe my sexual personality using a specific element (fire, water, earth, or air), which one fits me best in bed?",
        "What is a question about my hidden desires or turn-ons that you’ve been dying to ask me but haven’t found the right moment for?",
        "If we were to buy a brand new accessory or toy for the bedroom tonight, who gets to pick it out and test it first?",
        "What is the most intense, electrifying wave of physical chemistry you think we have ever felt just by looking at each other across a room?",
        "If you could give me a highly detailed command right now regarding what you want me to do to you tonight, what are the exact instructions?",
        "What is an aspect of our intimate life right now that makes you feel the most physically confident and secure as a partner?",
        "If tonight was the absolute last time we could ever get physical, what is the ultimate, unforgettable encounter you would design for us?"
    ],
    "Romantic": [
        "What was the exact moment you realized you were falling in love with me?",
        "What is a small, everyday habit of mine that secretly makes you smile?",
        "If our relationship was a movie or a book title, what would it be called?",
        "What is your favorite memory of us from our first few months of dating?",
        "When do you feel the most physically and emotionally safe with me?",
        "What is a song that always makes you think of me when you hear it?",
        "If we could pack a bag right now and go anywhere in the world together, where are we going?",
        "What is something I did recently that made you feel incredibly appreciated?",
        "How do you think we have changed or grown as a couple since we first met?",
        "What is your favorite physical feature of mine to look at when we're just talking?",
        "What does your ideal, no-phones, completely free date night look like?",
        "What is a compliment I gave you that stuck with you long after I said it?",
        "In what ways do you think we balance each other out or complement each other's personalities?",
        "What is a dream or a goal you have for our future together over the next five years?",
        "If you could relive one single day from our past together, exactly as it happened, which day would you choose?",
        "What is something new you'd love for us to try or learn together this year?",
        "How do you best receive love? (Words of affirmation, touch, gifts, quality time, or acts of service?)",
        "What is a secret nickname or thought you had about me before we started dating?",
        "When we are apart, what is the specific thing you miss the most about my presence?",
        "What is something you think we do better as a couple than most other people?",
        "What is a tradition you want us to start and keep doing for years to come?",
        "What is the most romantic thing you think someone could do for you?",
        "Do you believe in soulmates, and do you think we fit that description?",
        "What is a text message I sent you that you’ve secretly saved or re-read?",
        "What is one thing you hope never, ever changes about our relationship?",
        "What is something I did or said early on in our relationship that made you realize I was different from everyone else?",
        "If you could capture one specific sound or laugh of mine to listen to whenever you're stressed, which one would it be?",
        "What is a physical habit of mine when I'm sleeping or waking up that you find incredibly endearing?",
        "When we are sitting in complete silence together, what goes through your mind?",
        "What is a way I show love that you appreciated, even if it took you a little while to notice it?",
        "If you could freeze time during one specific moment we’ve shared together, which moment are we freezing?",
        "What is a topic or hobby you had zero interest in before meeting me, but now love because of me?",
        "What is something you think our relationship has taught you about yourself that you didn't know before?",
        "When do you feel the most proud to walk into a room holding my hand?",
        "What is a small, inexpensive gift I’ve given you that holds the highest sentimental value to you?",
        "If you were writing a love letter to me right now, what is the core message or feeling you’d want to get across?",
        "What is a subtle sign or cue you give when you just want me to hold you or be close to you?",
        "What is your favorite way for us to reconcile or reconnect after we’ve had a disagreement or a stressful day?",
        "If our love story had a specific theme song or soundtrack, what genre of music would it be?",
        "What is a dream about our future house, family, or lifestyle that you haven't mentioned out loud yet?",
        "What is an inner strength or quality of mine that you rely on when things get tough for you?",
        "If you could plan a surprise date for me with an unlimited budget, what is the first thing we are doing?",
        "What is a specific phrase or word I use often that you’ve started using yourself?",
        "When you look at me when I'm not paying attention, what are you usually thinking about?",
        "What is a memory of us that always makes you feel incredibly warm and nostalgic, no matter how long ago it happened?",
        "In what ways do you feel like our relationship creates a safe space for you to be your absolute weirdest self?",
        "What is a question you’ve been wanting to ask me about our relationship but have been waiting for the right moment?",
        "What is something you think we should celebrate more often as a couple that we currently overlook?",
        "If you could describe the feeling of our love using only three distinct adjectives, what would they be?",
        "What is one thing you want to make sure we always prioritize, no matter how busy or chaotic life gets?",
        "What is a specific way I support you or show up for you that makes you feel invincible?",
        "If you could design a custom piece of jewelry or a token that perfectly represents our relationship, what would it look like?",
        "What is a quirky or unique language or inside joke we share that you love the most?",
        "When did you first realize that you could trust me with your absolute deepest, darkest secrets?",
        "What is something you think I understand about you better than your closest friends or family members do?",
        "If we could recreate our very first date tonight but change one detail to make it even better, what would you change?",
        "What is a specific look I give you that tells you everything is going to be okay, no matter what?",
        "In what way do you think our relationship has made you a more gentle or understanding person?",
        "What is a dream vacation or milestone experience that you refuse to do with anyone else but me?",
        "What is a small text message or note I left you that completely turned a bad day around for you?",
        "When we are out in public together, what is a subtle way you like to remind me that you're glad you're with me?",
        "What is a strength of ours as a couple that you think will help us get through any future hardships?",
        "If you could pinpoint the exact moment you felt our relationship shift from dating to building a life together, when was it?",
        "What is a physical sensation or feeling you get only when you are wrapped tightly in my arms?",
        "What is an aspect of my personality or character that inspires you to be a better version of yourself?",
        "If you had to pick a specific flower, element, or landscape that matches the energy of our love, what would it be?",
        "What is something you think I do completely effortlessly that always leaves you a little bit in awe?",
        "How do you think our definitions of romance have changed since we first started dating?",
        "What is a specific memory of us overcoming a disagreement or misunderstanding that actually made you love me more?",
        "If you could give our relationship a guiding motto or family crest for the future, what would the words be?",
        "What is a hidden talent or passion of mine that you want to see me explore or show off more to the world?",
        "When you think about us growing old together, what is the specific image or scene that comes to your mind?",
        "What is a way that I make you feel intensely desired, not just physically, but emotionally and intellectually?",
        "If you could tell me one thing that you don't think I hear enough from you, what would it be?",
        "What is the greatest gift that being in this relationship has given to your everyday life?",
        "What is a specific way I touch your hair, face, or hands that instantly makes you feel grounded and calm?",
        "If you had to write a poem or a single sentence that captures the exact essence of how I make you feel, what would it say?",
        "What is an underrated quality of mine that you think doesn't get enough praise from the outside world?",
        "When you think about the word us, what is the very first mental image or memory that flashes in your mind?",
        "What is a dream or goal of mine that you are completely invested in helping me achieve?",
        "If you could take a snapshot of my face during one specific moment of our day, which expression are you saving forever?",
        "What is a way that being with me has changed how you look at your own future?",
        "When we are caught in a busy or stressful room full of people, what is our secret signal to each other that we’re ready to leave?",
        "What is a specific sacrifice you've seen me make for our relationship that made you respect me even more?",
        "If you could give me a superpower that would make my daily life 100 times easier, what superpower am I getting?",
        "What is a specific habit or character trait of mine that you hope our future children or family members inherit?",
        "When do you feel the most intellectually stimulated or challenged by a conversation we are having?",
        "What is a piece of clothing of mine that you secretly love to see me wear because you think I look incredible in it?",
        "If you could hear my thoughts for exactly five minutes, during what part of the day would you want to tune in?",
        "What is a reassurance or a reminder that I give you that you need to hear the most when you’re feeling insecure?",
        "What is a specific adventure or risk you took with me that you were terrified of at first but now love?",
        "If our relationship was an anchor, what specific storm or hard time did it keep us steady through?",
        "What is a little domestic moment we share (like cooking, grocery shopping, or cleaning) that you secretly look forward to?",
        "What is something you think I do that shows how much I love you without me ever having to say the actual words?",
        "If you could ask me to promise you one thing about our emotional future together, what promise do you want?",
        "What is an aspect of our connection that feels totally effortless, like it was always meant to be that way?",
        "When you look back at who you were before we started dating, how do you think our love has helped you heal?",
        "What is a specific goal or milestone we hit as a couple that made you think, Wow, we really are an incredible team?",
        "If you could give me one massive thank-you for something I did that went completely unacknowledged, what would it be for?",
        "What is the most permanent, unchanging truth about how much you love me that you want me to carry with me forever?"
    ]
};

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("join_room", (data) => {
        const roomName = data.roomName;
        const password = data.password;
        const targetRoom = rooms[roomName];

        if (targetRoom) {
            if (targetRoom.password === password) {
                if (targetRoom.users.length < 2) {
                    const position = targetRoom.users.length === 0 ? "left" : "right";
                    targetRoom.users.push(socket.id);
                    
                    socket.join(roomName);
                    
                    socket.emit("room_joined", { 
                        "status": "success", 
                        "roomName": roomName, 
                        "position": position,
                        "assets": targetRoom.assets
                    });

                    if (targetRoom.users.length === 2) {
                        io.to(roomName).emit("game_ready", "Both partners connected! Let the game begin.");
                        startTurn(roomName);
                    }
                } else {
                    socket.emit("room_error", "This room is already full.");
                }
            } else {
                socket.emit("room_error", "Incorrect password for " + roomName + " room.");
            }
        }
    });

    function startTurn(roomName) {
        const targetRoom = rooms[roomName];
        const activePlayerId = targetRoom.users[targetRoom.turnIndex];
        io.to(roomName).emit("turn_update", { "activePlayer": activePlayerId });
    }

    socket.on("select_category", (data) => {
        const category = data.category;
        const roomName = data.roomName;
        let categoryQuestions = [];
    
        // Logic for the Mix category
        if (category === "Mix") {
            for (let key in questionBank) {
                categoryQuestions = categoryQuestions.concat(questionBank[key]);
            }
        } else {
            // Standard category selection
            categoryQuestions = questionBank[category];
        }
        
        if (categoryQuestions && categoryQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
            const randomQuestion = categoryQuestions[randomIndex];
            
            io.to(roomName).emit("new_question", { "question": randomQuestion, "category": category });
        }
    });

    socket.on("submit_answer", (data) => {
        const roomName = data.roomName;
        io.to(roomName).emit("receive_answer", { "answer": data.answer, "sender": socket.id });
    });

    // New event to manually switch turns
    socket.on("next_turn", (data) => {
        const roomName = data.roomName;
        const targetRoom = rooms[roomName];
        
        targetRoom.turnIndex = targetRoom.turnIndex === 0 ? 1 : 0;
        startTurn(roomName);
    });

    // New event for the persistent side chat
    socket.on("send_side_chat", (data) => {
        io.to(data.roomName).emit("receive_side_chat", { "message": data.message, "sender": socket.id });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
