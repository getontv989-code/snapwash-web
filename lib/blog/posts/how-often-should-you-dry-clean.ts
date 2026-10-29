import type { Post } from "..";

const post: Post = {
  slug: "how-often-should-you-dry-clean",
  title: "How often should you actually dry clean your clothes?",
  description: "Suits, shirts, sweaters, coats and silk all need different schedules. A practical guide to how often to dry clean each piece, and the habits that save you trips.",
  category: "Garment care",
  author: "The Snapwash team",
  date: "2026-10-28",
  body: [
    { type: "p", text: "Most people dry clean too often or not nearly enough. There's rarely an in-between. One person sends a wool suit out after every single wear, while their roommate's favorite winter coat hasn't seen a cleaner since it left the store. Both are shortening the life of their clothes, just in different ways." },
    { type: "p", text: "So how often is right? It depends on the fabric, how hard you wear it and, honestly, how much you sweat on the subway in July. Here's a practical rule of thumb for the things that hang in most closets." },

    { type: "h2", id: "suits", text: "Suits and blazers: every four to six wears" },
    { type: "p", text: "Wool is tougher than it looks. It naturally resists odor and wrinkles, and a good suit can go several wears between cleanings if you give it a day off between outings. Dry cleaning uses solvents and heat, and every trip takes a little of the fabric's natural oils and body with it. Clean a suit too often and the cloth starts to look flat and shiny at the elbows and seat." },
    { type: "p", text: "What to do instead: hang it on a wide, shaped hanger as soon as you get home, brush it down, and let it air out overnight before it goes back in the closet. Spot-treat small marks right away. Send it out when it actually smells worn, has a visible stain, or after roughly four to six wears." },

    { type: "h2", id: "shirts", text: "Dress shirts: after every wear" },
    { type: "p", text: "Shirts are the opposite of suits. Cotton sits right against your skin and picks up sweat and body oil, and that's what causes yellow collars and underarm stains over time. Wear it once, then get it cleaned. Most cleaners will launder and press cotton dress shirts rather than dry clean them, which is gentler and usually cheaper. If you prefer a softer collar, say so. Plenty of shops will go light on the starch, or skip it, if you ask." },

    { type: "h2", id: "trousers", text: "Dress pants and skirts: every three to five wears" },
    { type: "p", text: "Like jackets, wool trousers and skirts can go a few wears, but they take more strain at the knees and seat. If you sit at a desk all day, lean toward the lower end. Hang trousers by the cuffs or folded over a padded bar so the crease holds." },

    { type: "h2", id: "sweaters", text: "Sweaters: it depends on the yarn" },
    { type: "p", text: "Cashmere and merino can go five or more wears, especially with a layer underneath. Fold them, never hang them, or the shoulders will stretch into points. Cotton and acrylic knits hold on to odor faster and usually need cleaning every two or three wears. A little pilling is normal, and a sweater comb handles it far better than a trip to the cleaner does." },

    { type: "h2", id: "coats", text: "Coats: once or twice a season" },
    { type: "p", text: "Your winter coat probably needs a professional clean once at the end of the season, before it goes into storage, and maybe once mid-winter if it's taken a beating from slush and road salt. Storing a coat dirty is the real mistake. Food, sweat and skin oils left in the fabric over the summer attract moths and set into stains that won't come out in October." },

    { type: "h2", id: "delicates", text: "Silk, linen and delicate pieces: after every wear or two" },
    { type: "p", text: "Silk shows sweat marks quickly and doesn't forgive home washing. Linen wrinkles if you look at it, and a professional press makes a bigger difference to linen than to almost any other fabric. Beaded or embellished pieces should always go to someone who knows what they're doing, and it's worth pointing out any loose sequins when you hand them over." },

    { type: "h2", id: "habits", text: "A few habits that cut down trips" },
    { type: "p", text: "Most of the wear on your clothes doesn't come from cleaning at all. It comes from how they're stored and handled in between. A few small habits go a long way:" },
    { type: "ul", items: [
      { lead: "Rotate.", text: "Don't wear the same suit or coat two days in a row. Giving the fibers 24 hours to recover makes a visible difference." },
      { lead: "Use proper hangers.", text: "Wire hangers from the cleaner are for getting clothes home, not for keeping them. Wooden or padded hangers keep shoulders in shape." },
      { lead: "Take off the plastic.", text: "The plastic bags from the cleaner trap moisture. Remove them when you get home, and use breathable cotton covers for long-term storage." },
      { lead: "Deal with stains fast.", text: "Blot, don't rub. And tell your cleaner what the stain is. “Red wine, Friday night” helps them far more than “some kind of mark.”" },
      { lead: "Steam between cleanings.", text: "A handheld steamer refreshes a jacket and drops out light wrinkles without the wear of a full clean." },
    ] },

    { type: "h2", id: "ask", text: "When in doubt, ask your cleaner" },
    { type: "p", text: "A good dry cleaner has seen every fabric, every stain and every questionable decision a closet can produce. If you're not sure whether something needs cleaning, ask. The best shops will tell you honestly when a garment just needs a press instead of a full clean. They'd rather keep you as a customer for years than squeeze one extra ticket out of you today." },
    { type: "quote", text: "Clean clothes on the schedule they need, not the one your errands allow." },
    { type: "p", text: "That's the idea behind Snapwash. We work with local dry cleaners and laundromats across New York, New Jersey and Connecticut, so you keep the shop and the expertise and skip the trip. Scan your bag in the app, a driver picks it up, and your clothes come back clean and pressed. When you're not carrying a bag of shirts six blocks in the rain, it gets a lot easier to clean things as often as they actually need." },
  ],
};

export default post;
