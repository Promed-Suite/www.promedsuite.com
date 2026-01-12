import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

export function PlaceholderContent({ title = "Content" }: { title?: string }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
            <p className="text-muted-foreground">
              Content area for
              {title}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FormContent({
  fields,
}: {
  fields: Array<{ label: string; placeholder: string }>;
}) {
  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="space-y-2">
          <Label htmlFor={`field-${index}`}>{field.label}</Label>
          <Input id={`field-${index}`} placeholder={field.placeholder} />
        </div>
      ))}
    </div>
  );
}
