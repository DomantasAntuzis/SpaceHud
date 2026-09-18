<script>
  import { resolve } from "$app/paths";

</script>
<header>
    <div id="title-wrapper">
        <i class="fa-solid fa-face-smile"></i>
        <div> Hangout </div>
    </div>
    <a href={resolve('/login')}>Login</a>
</header>

<style>
    header  {
        width: 80%;
        display: flex; flex-direction: row; justify-content: space-between;
        color: var(--color-text-primary);
    }
    #title-wrapper  {
        display: flex; flex-direction: row;
        font-size: 32px;
        font-weight: 600;
        font-family: var(--font-display);
    }
    #title-wrapper i{
        display: flex;
        align-self: center;
    }
    a {
        all: unset;
        display: flex;
        align-items: center; justify-content: center;
        font-family: var(--font-body); font-weight: 600;
        border-radius: 50px; border: 1px solid var(--color-border);
        padding: 5px 15px;
    }
    a:hover{
        cursor: pointer;
        background-color: var(--color-accent);
    }

    @media (max-width: 640px) {
        header {
            width: 90%;
        }
        #title-wrapper {
            font-size: 22px;
        }
        a {
            font-size: 14px;
            padding: 5px 12px;
        }
    }
</style>