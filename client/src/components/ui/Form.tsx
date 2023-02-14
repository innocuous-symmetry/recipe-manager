import { ChangeEvent, FC, useEffect, useState } from "react"
import { v4 } from "uuid"
import RichText from "./RichText"
import "/src/sass/components/Form.scss";

export interface FormConfig<T> {
    parent: string
    keys: string[]
    initialState: T
    getState: (received: T) => void
    labels?: string[]
    dataTypes?: string[]
    richTextInitialValue?: string
    extraStyles?: string
}

interface FormProps {
    parent: any
    _config: FormConfig<any>
}

const Form: FC<FormProps> = ({ parent, _config }) => {
    type T = typeof parent;
    const { getState } = _config;

    const [config, setConfig] = useState<FormConfig<T>>();
    const [state, setState] = useState<T>();
    const [contents, setContents] = useState<JSX.Element[]>();

    // initial setup
    useEffect(() => {
        if (!config) setConfig({
            ..._config,
            labels: _config.labels ?? _config.keys,
            dataTypes: _config.dataTypes ?? new Array(_config.keys?.length).fill("text"),
        });

        if (!state) setState(_config.initialState);
    }, [])

    // usecallback handling
    useEffect(() => {
        state && getState(state);
    }, [state]);

    // update methods
    function updateRichText(txt: string, idx: number) {
        if (!config) return;

        setState((prev: T) => {
            return {
                ...prev,
                [config.keys[idx]]: txt
            }
        })
    }

    function update(e: ChangeEvent<HTMLElement>, idx: number) {
        if (!config) return;

        setState((prev: T) => {
            return {
                ...prev,
                [config.keys[idx]]: e.target['value' as keyof EventTarget]
            }
        })
    }

    // mount the form once config has been loaded
    useEffect(() => {
        if (state && config) {
            const result = config.keys.map((each: string, i: number) => {
                
                if (config.dataTypes![i] == 'TINYMCE') {
                    return (
                        <div className="form-row-editor" id={`${config.parent}-row-${i}`} key={v4()}>
                            <label htmlFor={`${config.parent}-${each}`}>{config.labels![i]}</label>
                            <RichText id={`${config.parent}-${each}`} initialValue={config.richTextInitialValue} getState={(txt) => updateRichText(txt, i)} />
                        </div>
                    )
                } else {
                    return (
                        <div className="form-row" id={`${config.parent}-row-${i}`} key={v4()}>
                            <label htmlFor={`${config.parent}-${each}`}>{config.labels![i]}</label>
                            <input
                                type={config.dataTypes![i]}
                                id={`${config.parent}-${each}`}
                                onChange={(e) => update(e, i)}
                                value={state[i as keyof T] as string}>
                            </input>
                        </div>
                    )
                }
            });

            setContents(result);

        }
    }, [config]);

    return (
        <div className={`ui-form-component ${_config.extraStyles ?? ""}`}>
            { contents }
        </div>
    )
}

export default Form;