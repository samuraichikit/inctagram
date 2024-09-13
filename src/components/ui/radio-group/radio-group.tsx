import React, {ComponentPropsWithoutRef, ElementRef, forwardRef} from 'react';
import * as RadioGroupRadix from '@radix-ui/react-radio-group';
import s from './radio-group.module.scss';
import {Typography} from '@/components/ui/typography';
import clsx from 'clsx';

export interface RadioOption {
    disabled: boolean
    label: string
    value: string
}

export type RadioGroupProps = {
    options: RadioOption[],
} & Omit<ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>, 'asChild'>


export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>,
    RadioGroupProps>(
    (props, ref) => {
        const {className, options, ...rest} = props
        return (
            <form>
                <RadioGroupRadix.Root className={clsx(s.root, className)}
                                      defaultValue="default" ref={ref} {...rest}>
                    {
                        options.map((el, index) => (
                            <Typography className={clsx(s.label, {[s.disabled]: el.disabled}, className)} key={index}
                                        variant={'regular_text_14'}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <RadioGroupRadix.Item className={s.item} value={el.value} id={`radio-${index}`}
                                                          disabled={el.disabled}>
                                        <RadioGroupRadix.Indicator className={s.indicator}/>
                                    </RadioGroupRadix.Item>
                                    {el.label}
                                </div>
                            </Typography>
                        ))
                    }
                </RadioGroupRadix.Root>
            </form>
        )
    })
;


