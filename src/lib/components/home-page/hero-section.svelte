<script>
    import { resolve } from "$app/paths";
</script>

<div id="hero">
    <div id="hero-content-wrapper">
        <div id="big-text">your friends living room, but <span>online.</span></div>
        <div class="text">a place to hang out online with your friends — chat, listen to music, and watch stuff together</div>
        <div id="action-button-section">
            <a href={resolve('/room')}>
                create a space
            </a>
            <a href={resolve('/room')}>
                join with code
            </a>
        </div>
    </div>
</div>

<style>
    #hero{
        display: flex;
        width: 80%;
    }
    #hero-content-wrapper{
        display: flex; flex-direction: column;
        gap: 10px;
        width: 50%;
    }
    #big-text{
        font-weight: 700; font-size: 64px; font-family: var(--font-display);
        text-wrap: wrap;
        color: var(--color-text-primary);
    }
    #big-text span{
        color: #ff8b77;
    }
    .text{
        color: var(--color-text-secondary);
    }
    #action-button-section{
        display: flex; gap: 10px;
    }
    a{
        all: unset;
        display: flex;
        align-items: center; justify-content: center;
        font-family: var(--font-body); font-weight: 600;
        border-radius: 50px; border: 1px solid var(--color-border);
        padding: 10px 30px;
        color: var(--color-text-primary);
    }
    a:hover{
        cursor: pointer;
        background-color: var(--color-accent);
    }
    a:active{
        background-color: var(--color-accent);
    }

    @media (max-width: 1024px) {
        #hero-content-wrapper {
            width: 70%;
        }
        #big-text {
            font-size: 48px;
        }
    }

    @media (max-width: 640px) {
        #hero {
            width: 90%;
        }
        #hero-content-wrapper {
            width: 100%;
        }
        #big-text {
            font-size: 32px;
        }
        #action-button-section {
            flex-direction: column;
        }
        a {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 20px;
        }
    }
</style>