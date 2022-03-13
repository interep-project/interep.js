import {
    Box,
    Button,
    createStyles,
    createTheme,
    Divider,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Theme,
    ThemeProvider,
    Typography
} from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import ReplayIcon from "@material-ui/icons/Replay"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"
import React from "react"
import ReactDOM from "react-dom"
// eslint-disable-next-line import/no-relative-packages
import createIdentity from "../src"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        inputPaper: {
            padding: "2px 4px",
            display: "flex",
            alignItems: "center"
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1
        },
        iconButton: {
            padding: 10
        },
        divider: {
            height: 28,
            margin: 4
        },
        results: {
            position: "relative",
            width: 530
        },
        resetButton: {
            zIndex: 1,
            position: "absolute",
            right: 5,
            top: 5
        },
        listItem: {
            paddingTop: 0,
            paddingBottom: 0
        }
    })
)

const theme = createTheme({
    palette: {
        primary: {
            main: "#2e7d32"
        },
        secondary: {
            main: "#827717"
        }
    }
})

function App() {
    const classes = useStyles()
    const [_provider, setProvider] = React.useState<any>()
    const [_account, setAccount] = React.useState<string>("")
    const [_identityCommitment, setIdentityCommitment] = React.useState<any>()
    const [_identityNullifier, setIdentityNullifier] = React.useState<any>()
    const [_identityTrapdoor, setIdentityTrapdoor] = React.useState<any>()
    const [_oAuthProvider, setOAuthProvider] = React.useState<string>("")
    const [_activeStep, setActiveStep] = React.useState<number>(0)

    React.useEffect(() => {
        ;(async function IIFE() {
            if (!_provider) {
                const provider = (await detectEthereumProvider()) as any

                if (provider) {
                    setProvider(provider)
                } else {
                    console.error("Please install MetaMask!")
                }
            } else {
                const accounts = await _provider.request({ method: "eth_accounts" })

                if (accounts.length !== 0 && accounts[0]) {
                    setAccount(accounts[0])
                    setActiveStep(1)
                }

                _provider.on("accountsChanged", (newAccounts: string[]) => {
                    if (newAccounts.length !== 0) {
                        setAccount(newAccounts[0])
                    } else {
                        setActiveStep(0)
                        setAccount("")
                        setIdentityCommitment("")
                    }
                })
            }
        })()
    }, [_provider])

    function handleNext() {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
    }

    function resetSteps() {
        setActiveStep(1)
        setIdentityCommitment("")
    }

    async function connect() {
        await _provider.request({ method: "eth_requestAccounts" })
        setActiveStep(1)
    }

    async function generateIdentity() {
        const ethersProvider = new ethers.providers.Web3Provider(_provider)
        const signer = ethersProvider.getSigner()
        const identity = await createIdentity((message: string) => signer.signMessage(message), _oAuthProvider)

        const identityTrapdoor = identity.getTrapdoor()
        const identityNullifier = identity.getNullifier()
        const identityCommitment = identity.genIdentityCommitment()

        setIdentityTrapdoor(identityTrapdoor.toString())
        setIdentityNullifier(identityNullifier.toString())
        setIdentityCommitment(identityCommitment.toString())

        setActiveStep(3)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className={classes.container}>
                <Typography variant="h4">Interep identity</Typography>

                <Stepper activeStep={_activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Connect to MetaMask</StepLabel>
                        <StepContent style={{ width: 400 }}>
                            <Button onClick={() => connect()} variant="outlined" disabled={!_provider}>
                                Connect
                            </Button>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Enter a provider</StepLabel>
                        <StepContent style={{ width: 400 }}>
                            <Paper component="form" className={classes.inputPaper} onSubmit={(e) => e.preventDefault()}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Twitter"
                                    onChange={(event) => setOAuthProvider(event.target.value)}
                                    value={_oAuthProvider}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") handleNext()
                                    }}
                                />
                                <Divider className={classes.divider} orientation="vertical" />
                                <IconButton
                                    onClick={() => handleNext()}
                                    className={classes.iconButton}
                                    disabled={!_oAuthProvider}
                                    color="secondary"
                                >
                                    <CheckIcon />
                                </IconButton>
                            </Paper>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Generate the identity parameters</StepLabel>
                        <StepContent style={{ width: 400 }}>
                            <Button onClick={() => generateIdentity()} variant="outlined">
                                Generate identity
                            </Button>
                        </StepContent>
                    </Step>
                </Stepper>
                <Paper className={classes.results}>
                    {_identityCommitment && (
                        <IconButton onClick={() => resetSteps()} className={classes.resetButton} color="secondary">
                            <ReplayIcon />
                        </IconButton>
                    )}
                    <List>
                        {_account && (
                            <ListItem className={classes.listItem}>
                                <ListItemText primary="Selected account" secondary={_account} />
                            </ListItem>
                        )}
                        {_identityTrapdoor && (
                            <ListItem className={classes.listItem}>
                                <ListItemText
                                    primary="Identity trapdoor"
                                    secondary={`${_identityTrapdoor.substr(0, 50)}...`}
                                />
                            </ListItem>
                        )}
                        {_identityNullifier && (
                            <ListItem className={classes.listItem}>
                                <ListItemText
                                    primary="Identity nullifier"
                                    secondary={`${_identityNullifier.substr(0, 50)}...`}
                                />
                            </ListItem>
                        )}
                        {_identityCommitment && (
                            <ListItem className={classes.listItem}>
                                <ListItemText
                                    primary="Identity commitment"
                                    secondary={`${_identityCommitment.substr(0, 50)}...`}
                                />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}

const root = document.getElementById("root")

ReactDOM.render(<App />, root)
