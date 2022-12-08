import { ChangeEvent } from "react";
import { v4 } from 'uuid';
import RichText from "./RichText";

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
    richTextInitialValue?: string
}

export default class Form<T>{
    private parent: string;
    private labels: string[];
    private keys: string[];
    private dataTypes: any[]
    private state: T;
    private getState: (received: T) => void
    private richTextInitialValue?: string;

    constructor(config: FormConfig<T>){
        this.parent = config.parent;
        this.keys = config.keys;
        this.labels = config.labels || this.keys;
        this.dataTypes = config.dataTypes || new Array(this.keys.length).fill('text');
        this.state = config.initialState;
        this.getState = config.getState;
        this.richTextInitialValue = config.richTextInitialValue;
    }

    update(e: ChangeEvent<HTMLElement>, idx: number) {
        let newState = {
            ...this.state,
            [this.keys[idx]]: e.target['value' as keyof EventTarget]
        }

        this.state = newState;
        this.getState(newState);
    }

    updateRichText(txt: string, idx: number) {
        this.state = {
            ...this.state,
            [this.keys[idx]]: txt
        }

        this.getState(this.state);
    }

    mount() {
        let output = new Array<JSX.Element>();

        for (let i = 0; i < this.keys.length; i++) {
            let input: JSX.Element | null;

            if (this.dataTypes[i] == 'custom picker') {
                console.log('noted!');
                this.dataTypes[i] = 'text';
            }

            if (this.dataTypes[i] == 'TINYMCE') {
                input = (
                    <div id={`${this.parent}-row-${i}`} key={v4()}>
                        <label htmlFor={`${this.parent}-${this.keys[i]}`}>{this.labels[i]}</label>
                        <RichText id={`${this.parent}-${this.keys[i]}`} initialValue={this.richTextInitialValue} getState={(txt) => this.updateRichText(txt, i)} />
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