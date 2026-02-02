import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

import BenefitsTab from "./benefits-tab";
import ServiceUnitsTab from "./service-units-tab";

const tabs = [
  {
    name: "Benefits",
    value: "benefits",
    content: <BenefitsTab />,
  },
  {
    name: "Service Units",
    value: "service-units",
    content: <ServiceUnitsTab />,
  },
];

export default function CategoriesTab() {
  return (
    <div className="w-full">
      <Tabs defaultValue="benefits" className="">
        <TabsList className="bg-background h-full flex-col rounded-none border-l p-0">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="mr-5">{tab.content}</div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
