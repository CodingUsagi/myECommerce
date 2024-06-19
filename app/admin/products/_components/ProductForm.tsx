"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/formatters";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
      </div>
      {error.name && <div className="text-destructive">{error.name}</div>}
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price in Cents</Label>
        <Input
          type="text"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description || ""}
          />
        </div>
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" required={product == null} />
          {product != null && (
            <div className="text-muted-foreground">{product.filePath}</div>
          )}
        </div>
        {error.file && <div className="text-destructive">{error.file}</div>}
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            required={product == null}
          />
          {product != null && (
            <Image
              src={product.imagePath}
              alt={product.name}
              height="400"
              width="400"
            />
          )}
        </div>
        {error.image && <div className="text-destructive">{error.image}</div>}
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
