import { ChangeEvent, ChangeEventHandler } from "react";
import { Quill } from '.'
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
    getState: (received: T) => void
    labels?: string[]
    dataTypes?: string[]
}

export default class Form<T>{
    public parent: string;
    public labels: string[];
    public keys: string[];
    public dataTypes: any[]
    public state: T;
    public getState: (received: T) => void

    constructor(config: FormConfig<T>){
        this.parent = config.parent;
        this.keys = config.keys;
        this.labels = config.labels || this.keys;
        this.dataTypes = config.dataTypes || new Array(this.keys.length).fill('text');
        this.state = config.initialState;
        this.getState = config.getState;
    }

    update(e: ChangeEvent<HTMLElement>, idx: number) {
        let newState;

        if (this.dataTypes[idx] == 'QUILL') {
            newState = {
                ...this.state,
                [this.keys[idx]]: e
            }
        } else {
            newState = {
                ...this.state,
                [this.keys[idx]]: e.target['value' as keyof EventTarget]
            }
        }

        this.state = newState;
        this.getState(newState);
    }

    mount() {
        let output = new Array<JSX.Element>();

        for (let i = 0; i < this.keys.length; i++) {
            let input: JSX.Element | null;

            if (this.dataTypes[i] == 'custom picker') {
                console.log('noted!');
                this.dataTypes[i] = 'text';
            }

            if (this.dataTypes[i] == 'QUILL') {
                input = (
                    <div id={`${this.parent}-row-${i}`} key={v4()}>
                        <label htmlFor={`${this.parent}-${this.keys[i]}`}>{this.labels[i]}</label>
                        <Quill id={`${this.parent}-${this.keys[i]}`} onChange={(e) => this.update(e, i)} />
                    </div>
                )
            } else {
                input = (
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

            output.push(input);
        }

        return output;
    }
}