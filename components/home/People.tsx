import { Section, SectionHead, cx, wrap } from "../ui";
import { PHOTOS, photoSet } from "./photos";

const STORIES = [
  { photo: PHOTOS.door, tag: "At your door", title: "A knock, not a trip.", body: "Your driver comes up to the door in the window you picked. Hand over the bag and get on with your evening.", pos: "object-[38%_50%]",
    span: "col-span-7 row-span-2 min-h-[clamp(420px,46vw,640px)]", sizes: "(max-width: 900px) 100vw, 58vw" },
  { photo: PHOTOS.van, tag: "On the road", title: "Local drivers, tracked live.", body: "Neighbors on the route between your block and your cleaner, on the map the whole way.", pos: "object-[50%_12%]",
    span: "col-span-5 min-h-[clamp(260px,22vw,310px)] [--rd:.08s]", sizes: "(max-width: 900px) 100vw, 42vw" },
  { photo: PHOTOS.shop, tag: "At the cleaner", title: "Cared for by people.", body: "The shop you chose washes, presses and bags your order, then hands it straight to your driver.", pos: "object-[50%_35%]",
    span: "col-span-5 min-h-[clamp(260px,22vw,310px)] [--rd:.16s]", sizes: "(max-width: 900px) 100vw, 42vw" },
];

/** Photo story: the people who touch an order, from doorstep to counter and back. */
export default function People() {
  return (
    <Section id="people" aria-labelledby="people-title">
      <div className={wrap}>
        <SectionHead kicker="The people behind your bag" title="Real hands, every step of the way." titleId="people-title">
          An app books it. People do the rest: a driver from your area and the cleaner down the street.
        </SectionHead>
        <div className="grid grid-cols-12 gap-tile">
          {STORIES.map((s) => (
            <figure key={s.tag} className={cx(
              "reveal group/photo relative m-0 rounded-card overflow-hidden isolate bg-card flex flex-col justify-end max-lg:col-span-full max-lg:row-auto max-lg:min-h-[360px]",
              s.span,
            )}>
              <img {...photoSet(s.photo)} sizes={s.sizes} alt={s.photo.alt} loading="lazy" decoding="async"
                className={cx("absolute inset-0 -z-2 w-full h-full object-cover transition-transform duration-[1.2s] ease-brand group-hover/photo:scale-[1.04]", s.pos)} />
              <span className="absolute inset-0 -z-1 bg-linear-to-t from-navy/85 via-navy/25 to-transparent" aria-hidden="true"></span>
              <figcaption className="p-card text-white grid gap-2 max-w-[44ch]">
                <span className="justify-self-start font-body font-medium text-xs leading-none tracking-tag uppercase py-2 px-3 rounded-pill bg-white/18 backdrop-blur-sm">{s.tag}</span>
                <h3 className="text-xl leading-none tracking-display mt-1">{s.title}</h3>
                <p className="text-white/85">{s.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
