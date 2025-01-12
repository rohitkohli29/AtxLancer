import { useForm } from "react-hook-form";
import OnbordHader from "@/modules/onboarding/components/ui/OnbordHader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import NextStepButton from "@/modules/onboarding/components/ui/NextStepButton";
import { FreeLancerAboutSchema, freeLancerAboutSchema } from "@/validation/onboarding/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import country from '../../../../../data/country.json'

function FreelancerAbout() {
   const form = useForm<FreeLancerAboutSchema>({
     resolver: zodResolver(freeLancerAboutSchema),
     defaultValues: {
       description: "",
       title: "",
       gender: undefined,
       dateOfBirth: undefined,
       hourlyRate: 0,
       country: "",
     },
   });
  

  const onSubmit = (data: FreeLancerAboutSchema) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <OnbordHader
        title="About you"
        description="Provide your details to help us customize your experience."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          {/* Description Field */}
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium">Description</Label>
                <FormControl>
                  <Textarea
                    rows={4}
                    className="w-full"
                    placeholder="Enter your description here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Specialty Field */}
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium">Your Specialty</Label>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Professional title"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Gender and Date of Birth */}
          <div className="flex justify-between gap-4 max-sm:items-start items-center max-sm:flex-col">
            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label className="mb-2 block">Gender</Label>
                  <FormControl>
                    <RadioGroup
                      {...field}
                      onValueChange={field.onChange}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.gender?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="dateOfBirth"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Label htmlFor="date-picker" className="mb-2 block">
                    Date of Birth
                  </Label>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-picker"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2" />
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString().split("T")[0])
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.dateOfBirth?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Hourly Rate Field */}
          <FormField
            name="hourlyRate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="max-sm:w-full">
                <Label className="mb-2 block">Hourly Rate</Label>
                <FormControl>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="Enter your hourly rate"
                      className="pl-8 w-full"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.hourlyRate?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-1/2">
                <Label
                  htmlFor="country"
                  className="text-sm font-medium mb-2 block"
                >
                  Country
                </Label>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {country.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.country?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <NextStepButton handleSubmit={onSubmit} />
        </form>
      </Form>
    </div>
  );
}

export default FreelancerAbout;
