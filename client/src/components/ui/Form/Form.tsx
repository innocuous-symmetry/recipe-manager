import { ChangeEvent, FC, useEffect, useState } from "react"
import { v4 } from "uuid"
import { useAuthContext } from "../../../context/AuthContext";
import { useSelectorContext } from "../../../context/SelectorContext";
import SelectorProvider from "../../../context/SelectorProvider";
import { IIngredient, IUser } from "../../../schemas";
import API from "../../../util/API";
import RichText from "../RichText"
import Selector from "../Selector";
import "/src/sass/components/Form.scss";

export interface FormConfig<T> {
    parent: string
    keys: string[]
    initialState: T
    getState: (received: T) => void
    labels?: string[]
    dataTypes?: string[]
    richTextInitialValue?: string
    extraClasses?: string
    selectorInstance?: JSX.Element
}

interface FormProps {
    _config: FormConfig<any>
}

function Form<T>({ _config }: FormProps) {
    const { getState } = _config;

    const [config, setConfig] = useState<FormConfig<T>>();
    const [state, setState] = useState<T>(_config.initialState);
    const [contents, setContents] = useState<JSX.Element[]>();

    const { token } = useAuthContext();

    // initial setup
    useEffect(() => {
        setConfig({
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

    async function populateSelector(key: string): Promise<any[] | null> {
        if (!token) return null;

        switch (key) {
            case "ingredient":
                const ingredients = new API.Ingredient(token);
                const result = await ingredients.getAll();
                if (result) return result;
                break;
            default:
                break;
        }

        return [];
    }

    // mount the form once config has been loaded
    useEffect(() => {
        if (state && config) {
            (async() => {
                const result = config.keys.map(async (each: string, i: number) => {
                    if (config.dataTypes![i] == 'TINYMCE') {
                        return (
                            <div className="form-row-editor" id={`${config.parent}-row-${i}`} key={v4()}>
                                <label htmlFor={`${config.parent}-${each}`}>{config.labels![i]}</label>
                                <RichText id={`${config.parent}-${each}`} initialValue={config.richTextInitialValue} getState={(txt) => updateRichText(txt, i)} />
                            </div>
                        )
                    } else if (config.dataTypes![i] == 'SELECTOR') {
                        if (!config.selectorInstance) throw new Error("Dropdown was not provided to form component.")

                        return (
                            <div className="form-row" id={`${config.parent}-row-${i}`} key={v4()}>
                                <label htmlFor={`${config.parent}-${each}`}>{config.labels![i]}</label>
                                { config.selectorInstance }
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

                const mappedContents = await Promise.all(result);
                mappedContents && setContents(mappedContents);
            })();
        }
    }, [config]);

    return (
        <div className={`ui-form-component ${_config.extraClasses ?? ""}`}>
            { contents }
        </div>
    )
}

export default Form;