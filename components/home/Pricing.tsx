import { CheckIcon, Section, SectionHead, cx, wrap } from "../site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const PLANS = [
  { name: "Pay As You Go", amt: "$0", per: "to join", cta: "Start free", featured: false,
    perks: ["Pay for cleaning per order", "Delivery fee on each order", "Scanning, tracking, chat and proof of delivery included"] },
  { name: "Snapwash Unlimited", amt: "$14.99", per: "/ month", cta: "Go Unlimited", featured: true, ribbon: "Cancel anytime",
    perks: ["Free pickup and delivery on every order", "Priority queue at your cleaner", "Exclusive member discounts"] },
];

export default function Pricing() {
  return (
    <Section className="pt-0" id="pricing" aria-labelledby="price-title">
      <div className={wrap}>
        <SectionHead kicker="Pricing" title="Pay per trip, or never pay for one again." titleId="price-title">
          Your cleaner sets the cleaning price. Snapwash only decides how you pay for the ride there and back.
        </SectionHead>
        <div className="grid grid-cols-12 gap-tile items-stretch">
          {PLANS.map((p) => (
            <Card as="article" key={p.name} variant={p.featured ? "plain" : "default"} className={cx(
              "reveal p-card-lg flex flex-col gap-[18px] min-w-0 relative overflow-hidden transition-[transform,translate] duration-500 ease-brand hover:-translate-y-1.5 col-span-6 max-lg:col-span-full",
              p.featured && "bg-brand text-on-brand [--rd:.1s]",
            )}>
              {p.ribbon && <span className="absolute right-card-lg top-card-lg font-body font-medium text-xs leading-none tracking-tag uppercase py-2 px-3 rounded-pill bg-white/18 max-sm:static max-sm:self-start">{p.ribbon}</span>}
              <p className="font-body font-semibold text-lg leading-[1.2]">{p.name}</p>
              <p className="flex items-baseline gap-[10px] flex-wrap">
                <span className="font-display font-extrabold text-[clamp(2.75rem,1.8rem+2.8vw,4.5rem)] leading-[.85] tracking-display tabular-nums">{p.amt}</span>
                <span className="font-body font-medium text-sm leading-none opacity-80">{p.per}</span>
              </p>
              <ul className="grid gap-[10px]">
                {p.perks.map((perk) => (
                  <li key={perk} className="grid grid-cols-[22px_1fr] gap-3 items-start"><CheckIcon className={cx("w-[22px] h-[22px]", !p.featured && "text-brand")} /><span>{perk}</span></li>
                ))}
              </ul>
              <a className={cn(buttonVariants({ variant: p.featured ? "inverse" : "outline" }), "mt-auto self-start")} href="#download" data-magnetic>{p.cta}</a>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
