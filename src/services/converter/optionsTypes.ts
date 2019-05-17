import { FuzzyTuple } from '@/model/FuzzyTuple'

export interface ContFuzzOptions {
  start: number,
  end: number,
  fuzzy: FuzzyTuple
}

export interface ContWeightOptions {
  start: number,
  end: number,
  weight: number
}

export interface CategoryValue<T> {
  label: string
  value: T
}

export interface DiscFuzzOptions<T> {
  label: string
  fuzzy: FuzzyTuple
  value: T
}

export interface DiscWeightOptions<T> {
  label: string
  weight: number
  value: T
}
