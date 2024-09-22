

interface Props {
    onEnter: (event: React.KeyboardEvent<HTMLElement>) => void;
    setAlias: (event: string) => void;
    setPassword: (event: string) => void;
}

const AliasPasswordFields = (props: Props) => {
    const { onEnter, setAlias, setPassword } = props;
    return (
        <>
            <div className="form-floating">
            <input
                type="text"
                className="form-control"
                size={50}
                id="aliasInput"
                placeholder="name@example.com"
                onKeyDown={onEnter}
                onChange={(event) => setAlias(event.target.value)}
            />
            <label htmlFor="aliasInput">Alias</label>
            </div>
            <div className="form-floating">
            <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                onKeyDown={onEnter}
                onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="passwordInput">Password</label>
            </div>
        </>
    )
}

export default AliasPasswordFields;