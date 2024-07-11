<script setup lang="ts">
import {
  Bell,
  PackageSearch,
  Clock,
  UserRoundSearch,
  UserRoundCheck,
  FileDown,
} from "lucide-vue-next";
import millify from "millify";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

const client = useApiClient();
const { user } = useAuth();
const { url: avatarURL, isLoading: avatarIsLoading } = useBlobImage(
  () => client.bot.botControllerAvatar().then((res) => res.data!),
  "avatar-me",
);
</script>

<template>
  <div class="px-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-4">
        <Avatar class="size-14">
          <AvatarImage
            v-if="!avatarIsLoading"
            :src="avatarURL"
            alt="@radix-vue"
          />
          <AvatarFallback>{{ user.firstName.slice(0, 2) }}</AvatarFallback>
        </Avatar>
        <div class="flex flex-col">
          <span>{{ user.firstName }}</span>
          <span class="text-xs opacity-60">@{{ user.username }}</span>
        </div>
      </div>
      <Bell class="size-6 opacity-60" />
    </div>
    <div class="mt-8">
      <h2 class="text-3xl font-semibold">Показатели</h2>
      <Tabs default-value="month" class="w-full mt-4">
        <TabsList class="w-full bg-transparent">
          <TabsTrigger
            class="flex-1 data-[state=active]:bg-border rounded-lg"
            value="day"
          >
            День
          </TabsTrigger>
          <TabsTrigger
            class="flex-1 data-[state=active]:bg-border rounded-lg"
            value="week"
          >
            Неделя
          </TabsTrigger>
          <TabsTrigger
            class="flex-1 data-[state=active]:bg-border rounded-lg"
            value="month"
          >
            Месяц
          </TabsTrigger>
          <TabsTrigger
            class="flex-1 data-[state=active]:bg-border rounded-lg"
            value="year"
          >
            Год
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Card class="mt-4 p-4 border-none">
        <div class="">
          <div class="flex items-center gap-x-4 text-xs">
            <h4>Февраль</h4>
            <div class="text-destructive flex items-center gap-x-1">
              <svg
                class="fill-current"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.01802 6.14958C5.58168 6.63772 6.41832 6.63772 6.98198 6.14958L10.7529 2.88389C11.8027 1.97469 11.1597 0.25 9.77089 0.25H2.22911C0.840278 0.25 0.197274 1.97469 1.24713 2.88389L5.01802 6.14958Z"
                />
              </svg>
              <span>9%</span>
            </div>
          </div>
          <h3 class="font-bold text-3xl mt-3 mb-4">42.500 р</h3>
        </div>
        <BarChart
          class="h-32"
          :data="data"
          :categories="['total']"
          :index="'name'"
          :rounded-corners="4"
          :showXAxis="false"
          :y-formatter="
            (tick, i) => {
              return typeof tick === 'number'
                ? millify(tick, {
                    units: [undefined, 'тыс'],
                    space: true,
                  })
                : '';
            }
          "
          :margin="{ bottom: 2 }"
          :showLegend="false"
          :showGridLine="false"
        />
      </Card>
      <Card class="mt-4 p-4 border-none flex justify-between items-center">
        <div class="flex flex-col items-center">
          <span class="text-xl font-medium">46.333</span>
          <span class="text-xs">Выручка</span>
        </div>
        <div class="w-[1px] bg-border h-9"></div>
        <div class="flex flex-col items-center opacity-60">
          <span class="text-xl font-medium">46.333</span>
          <span class="text-xs">Выручка</span>
        </div>
        <div class="w-[1px] bg-border h-9"></div>
        <div class="flex flex-col items-center opacity-60">
          <span class="text-xl font-medium">46.333</span>
          <span class="text-xs">Выручка</span>
        </div>
        <div class="w-[1px] bg-border h-9"></div>
        <div class="flex flex-col items-center opacity-60">
          <span class="text-xl font-medium">46.333</span>
          <span class="text-xs">Выручка</span>
        </div>
      </Card>
    </div>
    <div class="mt-8">
      <h2 class="text-3xl font-semibold">Показатели</h2>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <Button
          variant="ghost"
          class="group justify-start flex items-center h-auto p-0 w-auto whitespace-normal text-left hover:bg-blue-600"
        >
          <div
            class="size-12 min-w-12 bg-blue-600/30 rounded-lg flex justify-center items-center"
          >
            <PackageSearch
              class="transition-colors size-8 stroke-blue-600 group-hover:stroke-white max-w-20"
            />
          </div>
          <span
            class="transition-all font-medium text-sm ml-2 group-hover:ml-0 max-w-3xl"
            >Продажи по товарам</span
          >
        </Button>
        <Button
          variant="ghost"
          class="group flex justify-start items-center h-auto p-0 w-auto whitespace-normal text-left hover:bg-yellow-500"
        >
          <div
            class="size-12 min-w-12 bg-yellow-500/30 rounded-lg flex justify-center items-center"
          >
            <Clock
              class="transition-colors size-8 stroke-yellow-500 group-hover:stroke-white"
            />
          </div>
          <span class="transition-all font-medium text-sm ml-2 group-hover:ml-0 max-w-20"
            >Продажи по датам</span
          >
        </Button>
        <Button
          variant="ghost"
          class="group flex justify-start items-center h-auto p-0 w-auto whitespace-normal text-left hover:bg-red-600"
        >
          <div
            class="size-12 min-w-12 bg-red-600/30 rounded-lg flex justify-center items-center"
          >
            <UserRoundSearch
              class="transition-colors size-8 stroke-red-600 group-hover:stroke-white"
            />
          </div>
          <span
            class="transition-all font-medium text-sm ml-2 group-hover:ml-0 max-w-20"
            >Отчет по агентам</span
          >
        </Button>
        <Button
          variant="ghost"
          class="group flex justify-start items-center h-auto p-0 w-auto whitespace-normal text-left hover:bg-purple-600"
        >
          <div
            class="size-12 min-w-12 bg-purple-600/30 rounded-lg flex justify-center items-center"
          >
            <UserRoundCheck
              class="transition-colors size-8 stroke-purple-600 group-hover:stroke-white"
            />
          </div>
          <span class="transition-all font-medium text-sm ml-2 group-hover:ml-0 max-w-20"
            >Отчет по сотрудникам</span
          >
        </Button>
        <Button
          variant="ghost"
          class="group flex justify-start items-center h-auto p-0 w-auto whitespace-normal text-left hover:bg-pink-500"
        >
          <div
            class="size-12 min-w-12 bg-pink-500/30 rounded-lg flex justify-center items-center"
          >
            <FileDown
              class="transition-colors size-8 stroke-pink-500 group-hover:stroke-white"
            />
          </div>
          <span class="transition-all font-medium text-sm ml-2 group-hover:ml-0 max-w-20"
            >Финансовый отчет</span
          >
        </Button>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-3xl font-semibold">Оценка склада</h2>
      <Card class="mt-4 p-4 border-none flex flex-col gap-y-4">
        <div class="flex justify-between items-end w-full">
          <div>Количество товаров</div>
          <div>7530 <span class="opacity-60">ед</span></div>
        </div>
        <div class="flex justify-between items-end w-full">
          <div>
            <span class="text-xs opacity-60">Стоимость товаров</span>
            <h4>В розничных ценах</h4>
          </div>
          <div>7530<span class="opacity-60">,00 р</span></div>
        </div>
        <div class="flex justify-between items-end w-full">
          <div>
            <span class="text-xs opacity-60">Стоимость товаров</span>
            <h4>По себестоимости</h4>
          </div>
          <div>7530<span class="opacity-60">,00 р</span></div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
