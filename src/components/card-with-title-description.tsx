import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React from "react"

type CardWithTitleAndDescriptionProps = {
  title: string
  description: string
  children: React.ReactNode
}
const CardWithTitleAndDescription = ({
  title,
  description,
  children,
}: CardWithTitleAndDescriptionProps) => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  )
}

export default CardWithTitleAndDescription
