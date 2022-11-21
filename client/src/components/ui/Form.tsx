import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { v4 } from 'uuid';

/**
 * For the generation of more complex form objects with
 * larger stateful values; expects to receive an object of
 * type T to a form which can mutate T with a state setter
 * of type Dispatch<SetStateAction<T>>
**/

export interface FormConfig<T> {
    parent: string
    keys: string[]
    initialState: T
    setState: Dispatch<SetStateAction<T>>
    labels?: string[]
    dataTypes?: string[]
    submitFunction?: (params: any) => any
    submitButtonText?: string
}

export default class Form<T>{
    public parent: string;
    public labels: string[];
    public keys: string[];
    public dataTypes: any[]
    public length: number;
    public state: T;
    public submitButtonText?: string;
    public submitFunction?: (params: any) => any;
    public setState: any

    constructor(config: FormConfig<T>){
        this.parent = config.parent;
        this.keys = config.keys;
        this.labels = config.labels || this.keys;
        this.length = config.keys.length;
        this.submitFunction = config.submitFunction || undefined;
        this.submitButtonText = config.submitButtonText || undefined;
        this.dataTypes = config.dataTypes || new Array(this.keys.length).fill('text');
        this.state = config.initialState;
        this.setState = config.setState;
    }

    update(e: ChangeEvent<HTMLElement>, idx: number) {
        let newState = {
            ...this.state,
            [this.keys[idx]]: e.target['value' as keyof EventTarget]
        }

        this.state = newState;
        this.setState(newState);

        console.log(this.state);
        this.mount();
    }

    mount() {
        let output = new Array<JSX.Element>();

        for (let i = 0; i < this.length; i++) {
            output.push(
                <div id={`${this.parent}-row-${i}`} key={v4()}>
                    <label htmlFor={`${this.parent}-${this.keys[i]}`}>{this.labels[i]}</label>
                    <input
                        type={this.dataTypes[i]}
                        id={`${this.parent}-${this.keys[i]}`}
                        onChange={(e) => this.update(e, i)}
                        value={this.state[i as keyof T] as string}>
                    </input>
                </div>
            )
        }

        if (this.submitFunction) {
            output.push(
                <button key={v4()} onClick={this.submitFunction}>{this.submitButtonText || 'Button'}</button>
            )
        }

        return output;
    }
}